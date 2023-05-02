import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import PostList from "../posts/PostList";

type ProfileTabsProps = {
  tabIndex: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  getPostsKey: (index: number) => string | null;
  getPostRepliesKey: (index: number) => string | null;
};

const TABS = ["posts", "replies"];

const ProfileTabs = ({
  tabIndex,
  onTabChange,
  getPostsKey,
  getPostRepliesKey,
}: ProfileTabsProps) => {
  return (
    <>
      <Tabs value={tabIndex} onChange={onTabChange} sx={{ display: "flex" }}>
        {TABS.map((tab, index) => (
          <Tab key={index} label={tab} sx={{ flex: 1 }} />
        ))}
      </Tabs>
      {tabIndex === 0 ? (
        <PostList getPostsKey={getPostsKey} repliesMode={false} />
      ) : (
        <PostList getPostsKey={getPostRepliesKey} repliesMode />
      )}
    </>
  );
};

export default ProfileTabs;
