import { Tab } from "@rneui/base";
import { Dispatch, SetStateAction } from "react";
import { ScrollView, StyleSheet, View, I18nManager } from "react-native";
import { tabsStyles } from "@/globalStyles";

interface HeadingTabsProps {
  tabItems: string[];
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export const HeadingTabs = ({
  tabItems,
  tabIndex,
  setTabIndex,
}: HeadingTabsProps) => {
  const isRTL = I18nManager.isRTL; // Detect RTL layout dynamically

  return (
    <View style={tabsStyles.tabsHeader}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: isRTL ? "row-reverse" : "row", // Switch direction based on RTL
        }}
      >
        <Tab
          value={tabIndex}
          onChange={setTabIndex}
          style={tabsStyles.tabs}
          disableIndicator
          dense
        >
          {tabItems.map((tabTitle, index) => (
            <Tab.Item
              key={index}
              containerStyle={[
                tabsStyles.tab,
                tabIndex === index && tabsStyles.selectedTab,
              ]}
              titleStyle={{
                color: tabIndex === index ? "#4B7447" : "black", // Earth Green when selected, Medium Light Green when not
                textAlign: isRTL ? "right" : "left", // Align text for RTL/LTR
              }}
            >
              {tabTitle}
            </Tab.Item>
          ))}
        </Tab>
      </ScrollView>
    </View>
  );
};
