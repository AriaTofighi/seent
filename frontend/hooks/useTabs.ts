import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useTabs = (
  tabs: string[],
  defaultTab: string = tabs[0],
  basePath: string = ""
) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(tabs.indexOf(defaultTab));

  useEffect(() => {
    const currentTab = router.query.t as string;
    if (!currentTab && tabIndex !== tabs.indexOf(defaultTab)) {
      setTabIndex(tabs.indexOf(defaultTab));
    } else if (
      currentTab &&
      tabs.indexOf(currentTab) !== -1 &&
      tabs.indexOf(currentTab) !== tabIndex
    ) {
      setTabIndex(tabs.indexOf(currentTab));
    }
  }, [router.query.t]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const tab = tabs[newValue];
    if (tab === defaultTab) {
      router.push(basePath);
    } else {
      router.push(`${basePath}?t=${tab}`);
    }
  };

  return {
    tabIndex,
    handleChange,
  };
};
