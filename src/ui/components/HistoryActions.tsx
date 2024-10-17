import { useState } from 'react';
import { Avatar, List } from 'antd';
import "@ui/components/HistoryActions.scss"

function HistoryActions() {
  interface HistoryItem {
    title: string;
    description: string;
  }

  const [data, setData] = useState<HistoryItem[]>([
    {
      title: 'Action 1',
      description: 'Description 1'
    },
    {
      title: 'Action 2',
      description: 'Description 2'
    },
    {
      title: 'Action 3',
      description: 'Description 3'
    },
    {
      title: 'Action 4',
      description: 'Description 4'
    }
  ]);
  return (
    <div className='historyActions'>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default HistoryActions;