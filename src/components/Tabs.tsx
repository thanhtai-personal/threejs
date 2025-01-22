import { Suspense, useState } from "react";

type Tab = {
  key: number;
  title: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]);

  return (
    <div className="w-full h-full">
      {/* Tab Titles */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, _index) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab.key === tab.key
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full h-full">
        {activeTab?.content || (
          <div className="text-gray-500">No content available</div>
        )}
      </div>
    </div>
  );
};
