import React,{useState} from 'react'
import {Tabs,TabPane} from '../../atoms'

const TabsEditable = ({initialPanes,content}) => {
    const [newTabIndex, setnewTabIndex] = useState(0);
    const [activeKey, setactiveKey] = useState(initialPanes[0].key);
    const [panes, setpanes] = useState(initialPanes);

  const onChange = activeKey => {
    setactiveKey(activeKey);
  };

  const onEdit = (targetKey, action) => {
      if(action==="add"){
        add()
      }else{
        remove(targetKey)
      }
  };

  const add = () => {
    const activeKey = `newTab${newTabIndex+1}`;
    setnewTabIndex(newTabIndex+1);
    const newPanes = [...panes];
    newPanes.push({ title: 'Horario', content: content, key: activeKey });
    setpanes(newPanes)
    setactiveKey(activeKey)
  };

  const remove = targetKey => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setpanes(newPanes)
    setactiveKey(newActiveKey)
  };

    return (
        <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        tabPosition="left"
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    )
}

export default TabsEditable
