import { Divider, Card, } from "antd";
import  "./test.css"
import {
  FileTextOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { useState } from "react";
const emptyCord = { width: 124, marginRight: 16 }
const iconSize = { fontSize: "76px" }
const labelSize = { fontSize: "16px", margin: "0 auto" }
const customTemplate = { display: "flex", flexWrap: "wrap" }
const MobileTest = () => {
  const templateAll = [
    { id: 1, title: '会前任务' },
    { id: 2, title: '历史回顾' },
    { id: 3, title: '使命愿景' },
    { id: 4, title: '价值观' },
    { id: 5, title: '行动计划' }]
    const [activeCard, setActiveCard] = useState(0)
  return (
    <div>
      <Card
        hoverable
        onClick={()=>setActiveCard(0)}
        className={activeCard===0?"activeCard":""}
        style={emptyCord}
      >
        <FileOutlined style={iconSize} />
        {/* <FileOutlined /> */}
        <div style={labelSize}>空白表格</div>
      </Card>
      <Divider />
      <div style={customTemplate}>
        {
          templateAll.map((item) => {
            return <Card
            hoverable
            onClick={()=>setActiveCard(item.id)}
            key={item.id}
            className={activeCard===item.id?"activeCard":""}
              style={emptyCord}
            >
              <FileTextOutlined style={iconSize} />
              <div style={labelSize}>{item.title}</div>
            </Card>
          })
        }
      </div>
    </div>
  )
}
export default MobileTest;