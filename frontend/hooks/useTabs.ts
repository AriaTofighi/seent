import { useRouter } from "next/router";

export const useTabs = (tabs: string[]) => {
  const router = useRouter();
  const { query } = router;
  const { t = tabs[0] } = query;
  const tabIndex = tabs.indexOf(t as string);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const tab = tabs[newValue];
    if (tab === tabs[0]) {
      router.push(`/${query.id}`);
    } else {
      router.push(`/${query.id}?t=${tab}`);
    }
  };

  return {
    tabIndex,
    handleChange,
  };
};
