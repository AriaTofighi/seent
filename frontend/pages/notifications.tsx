import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import Title from "../components/UI/Title";
import { useUser } from "../contexts/UserContext";
import useInfiniteAPI from "../hooks/useInfiniteAPI";
import { markNotificationsRead } from "../services/api/notificationAxios";
import {
  NextPageWithLayout,
  NotificationEntity,
  PaginatedResult,
  Styles,
} from "../types";
import { infiniteSWRToFlat } from "../utils";
import NotificationCard from "../components/notifications/NotificationCard";
import Loader from "../components/UI/Loader";

const Notifications: NextPageWithLayout = () => {
  const { user, mutate: mutateUser } = useUser();
  const [markedAsRead, setMarkedAsRead] = useState(false);

  const getNotificationsKey = (index: number) =>
    `notifications?recipientId=${user?.userId}&roomId=null&page=${
      index + 1
    }&perPage=20`;

  const {
    data: notificationsList,
    error: notificationsError,
    loading: notificationsLoading,
    isValidating: notificationsValidating,
    size,
    setSize,
    mutate: mutateNotifications,
  } = useInfiniteAPI<PaginatedResult<NotificationEntity>>(getNotificationsKey);

  const flatNotifications = infiniteSWRToFlat(notificationsList);

  const hasMore = notificationsList?.[notificationsList.length - 1].meta?.next;

  const getNotificationMessage = (notification: any) => {
    const { sender, type } = notification;

    switch (type) {
      case "LIKE":
        return `${sender.username} liked your post:`;
      case "REPLY":
        return `${sender.username} replied to your post:`;
      case "FRIEND_REQUEST":
        return `${sender.username} sent you a friend request.`;
      case "FRIEND_ACCEPT":
        return `${sender.username} accepted your friend request.`;
      default:
        return "";
    }
  };

  const getNotificationUrl = (notification: any) => {
    const { postId, type } = notification;

    switch (type) {
      case "LIKE":
        return `/posts/${postId}`;
      case "REPLY":
        return `/posts/${postId}`;
      case "FRIEND_REQUEST":
        return `/${notification.sender.username}`;
      case "FRIEND_ACCEPT":
        return `/${notification.sender.username}`;
      default:
        return "";
    }
  };

  useEffect(() => {
    (async () => {
      if (notificationsLoading || !user || markedAsRead) return;
      const notificationIds = flatNotifications.map(
        (notification) => notification.notificationId
      );
      await markNotificationsRead(notificationIds, true);
      await mutateUser();
      await mutateNotifications();
      setMarkedAsRead(true);
    })();
  }, [notificationsList]);

  return (
    <>
      <Title title="Notifications" />
      <TopAppBar title="Notifications" />
      <Box sx={styles.root}>
        {notificationsError && <Box p={2}>Error</Box>}
        {!notificationsLoading && flatNotifications.length === 0 && (
          <Box p={2}>No notifications</Box>
        )}
        {flatNotifications && (
          <>
            {flatNotifications.map((notification) => (
              <NotificationCard
                key={notification.notificationId}
                message={getNotificationMessage(notification)}
                url={getNotificationUrl(notification)}
                sender={notification.sender}
                createdAt={notification.createdAt}
                post={notification.post}
              />
            ))}
          </>
        )}
        <Loader
          disabled={!hasMore}
          onClick={() => setSize(size + 1)}
          loading={notificationsLoading}
        />
      </Box>
    </>
  );
};

const styles: Styles = {
  root: {},
};

Notifications.getLayout = getMainLayout;

export default Notifications;
