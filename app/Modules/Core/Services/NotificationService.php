<?php

declare(strict_types=1);

namespace App\Modules\Core\Services;

use App\Modules\Core\Jobs\SendNotificationJob;
use App\Modules\Core\Models\Notification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

final class NotificationService
{
    /**
     * Send a notification to a notifiable entity via one or more channels.
     * Creates a Notification record per channel and dispatches SendNotificationJob.
     */
    public function send(
        Model $notifiable,
        string $type,
        array $data,
        array $channels = ['in_app'],
    ): void {
        $tenantId = $this->resolveTenantId($notifiable);

        foreach ($channels as $channel) {
            $notification = Notification::create([
                'tenant_id'       => $tenantId,
                'notifiable_type' => get_class($notifiable),
                'notifiable_id'   => $notifiable->getKey(),
                'type'            => $type,
                'data'            => $data,
                'channel'         => $channel,
                'status'          => 'pending',
            ]);

            SendNotificationJob::dispatch($notification)->onQueue('notifications');
        }
    }

    public function markAsRead(string $notificationId): void
    {
        $notification = Notification::withoutGlobalScopes()->findOrFail($notificationId);
        $notification->markAsRead();
    }

    public function markAllAsRead(Model $notifiable): void
    {
        Notification::where('notifiable_type', get_class($notifiable))
            ->where('notifiable_id', $notifiable->getKey())
            ->whereNull('read_at')
            ->update([
                'read_at' => now(),
                'status'  => 'read',
            ]);
    }

    public function getUnread(Model $notifiable, int $limit = 20): Collection
    {
        return Notification::where('notifiable_type', get_class($notifiable))
            ->where('notifiable_id', $notifiable->getKey())
            ->unread()
            ->latest()
            ->limit($limit)
            ->get();
    }

    public function getAll(Model $notifiable, int $perPage = 20): LengthAwarePaginator
    {
        return Notification::where('notifiable_type', get_class($notifiable))
            ->where('notifiable_id', $notifiable->getKey())
            ->latest()
            ->paginate($perPage);
    }

    private function resolveTenantId(Model $notifiable): int|string
    {
        if (!empty($notifiable->tenant_id)) {
            return $notifiable->tenant_id;
        }

        if (app()->has('tenant') && app('tenant') !== null) {
            return app('tenant')->id;
        }

        throw new \RuntimeException('Cannot resolve tenant_id for notification.');
    }
}
