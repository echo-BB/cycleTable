import { React, useState, useEffect } from "react";
import { Table, Tabs, Tooltip, Button, Input, Modal, Popover, message, Form, Typography, InputNumber, DatePicker, Popconfirm, Checkbox } from "antd";
import ExcelJS from "exceljs";
const { TextArea } = Input;
const tabsStyle = {
    width: "98%"
}

const tooltipIcon = <svg t="1681116195214" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3817" data-spm-anchor-id="a313x.7781069.0.i2" width="14" height="14"><path d="M548.352 730.624l394.24-360.96c21.504-19.456 23.04-53.248 3.072-74.24-19.456-21.504-53.248-23.04-74.24-3.072l-358.912 328.704L153.088 291.84c-21.504-19.456-54.784-17.92-74.24 3.584-19.456 21.504-17.92 54.784 3.584 74.24l394.752 360.448c1.024 0.512 1.536 1.536 2.56 2.048 19.456 16.896 49.152 16.384 68.608-1.536z" p-id="3818"></path></svg>
const tipIcon = <svg t="1681442549332" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1511" width="20" height="20"><path d="M904.32 453.952c-12.736-12.736-33.408-12.736-46.144 0L512 800.128 165.824 453.952c-12.736-12.736-33.408-12.736-46.144 0L73.536 500.096c-12.736 12.736-12.736 33.408 0 46.144l415.36 415.36c12.736 12.736 33.408 12.736 46.144 0l415.36-415.36c12.736-12.736 12.736-33.408 0-46.144L904.32 453.952zM488.896 570.048c12.736 12.736 33.408 12.736 46.144 0l415.36-415.36c12.736-12.736 12.736-33.408 0-46.144L904.32 62.336c-12.736-12.736-33.408-12.736-46.144 0L512 408.512 165.824 62.336c-12.736-12.736-33.408-12.736-46.144 0L73.536 108.48c-12.736 12.736-12.736 33.408 0 46.144L488.896 570.048z" p-id="1512" fill="#8a8a8a"></path></svg>
const shareIcon = <svg t="1681442633310" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1719" width="20" height="20"><path d="M810.688 362.688c-40.64 0-77.376-16.32-104.32-42.688L453.824 457.792C458.752 475.136 462.208 493.056 462.208 512c0 18.944-3.52 36.864-8.448 54.208L706.368 704c26.944-26.304 63.68-42.688 104.32-42.688 82.496 0 149.312 66.88 149.312 149.312S893.12 960 810.688 960s-149.312-66.88-149.312-149.312c0-10.304 1.024-20.352 3.008-30.016l-252.352-137.664c-36.48 41.472-89.344 68.096-148.864 68.096C153.152 711.104 64 621.952 64 512s89.152-199.104 199.104-199.104c59.584 0 112.384 26.688 148.864 68.096l252.352-137.664c-1.984-9.728-3.008-19.712-3.008-30.016C661.312 130.88 728.192 64 810.688 64 893.12 64 960 130.88 960 213.312S893.12 362.688 810.688 362.688z" p-id="1720" fill="#8a8a8a"></path></svg>
const importIcon = <svg t="1681442852436" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2023" width="20" height="20"><path d="M877.614 743.251v218.749h-731.227v-218.861c0-30.205 23.399-54.673 52.254-54.673s52.254 24.468 52.254 54.729c0 0 0 0.056 0 0.056v109.346h522.264v-109.403c0-30.205 23.399-54.673 52.254-54.673s52.254 24.468 52.254 54.729c-0.056-0.056-0.056-0.056-0.056 0zM752.067 418.192c-10.181 10.688-26.718 10.688-36.955 0l-150.914-158.057v400.938c0 15.13-11.7 27.337-26.099 27.337h-52.198c-14.399 0-26.099-12.263-26.099-27.337v-400.938l-150.914 158.057c-10.181 10.688-26.718 10.688-36.955 0l-36.955-38.643c-10.181-10.688-10.181-28.012 0-38.699l258.574-270.835c10.181-10.688 26.718-10.688 36.899 0l258.517 270.835c10.181 10.688 10.181 28.012 0 38.699l-36.899 38.643z" p-id="2024" fill="#8a8a8a"></path></svg>
const tabsDataAll = [
    {
        id: 0,
        tabName: "与会人员",
        tableDescribe: "访谈要求：1、访谈时间30-60min/人，视频会议or电话形式；2、可访谈时间：2月4日-2月6日全天，10:00-22:00（填写参考高管访谈时间安排表）；\n访谈对象：1、人数要求7-8人；2、选择标准：对组织有影响力、对公司理解透彻；老人（8年以上）和新人（2年以内）无比例要求；",
        tableRule: "",
        dataSource: [
            {
                key: '1',
                姓名: '胡彦斌1111',
                年龄: 32,
                日期: '2023',
                住址: '西湖区湖底公园1号',
            },
            {
                key: '2',
                姓名: '胡彦祖1111',
                年龄: 42,
                日期: '2022',
                住址: '西湖区湖底公园',
            }, {
                key: '3',
                姓名: '胡彦祖1111',
                年龄: 12,
                日期: '2022',
                住址: '西湖区湖底公园1号',
            }, {
                key: '4',
                姓名: '胡彦祖1111',
                年龄: 13,
                日期: '2023',
                住址: '西湖区湖底公园1号西湖区湖底公园1号',
            },
        ],
        columns: [
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                type: 'text',
                editable: true
            },
            {
                title: '年龄',
                dataIndex: '年龄',
                key: '年龄',
                type: 'number',
                editable: true
            },
            {
                title: '日期',
                dataIndex: '日期',
                key: '日期',
                type: 'date',
                editable: true
            },
            {
                title: '住址',
                dataIndex: '住址',
                key: '住址',
                type: 'text',
                editable: true
            }
        ]
    },
    {
        id: 1,
        tabName: "访谈高管",
        tableDescribe: "",
        tableRule: "",
        dataSource: [
            {
                key: '1',
                姓名: '22222',
                年龄: 32,
                住址: '西湖区湖底公园1号',
            },
            {
                key: '2',
                姓名: '22222',
                年龄: 42,
                住址: '西湖区湖底公园1号',
            },
        ],
        columns: [
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
            },
            {
                title: '年龄',
                dataIndex: '年龄',
                key: '年龄',
            },
            {
                title: '住址',
                dataIndex: '住址',
                key: '住址',
            }
        ]
    }, {
        id: 2,
        tabName: "自定义表格",
        tableDescribe: "123123123123",
        tableRule: "",
        dataSource: [
            {
                key: '1',
                姓名: '胡彦斌',
                年龄: 32,
                住址: '西湖区湖底公园1号',
            },
            {
                key: '2',
                姓名: '胡彦祖',
                年龄: 42,
                住址: '西湖区湖底公园1号',
            },
        ],
        columns: [
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
            },
            {
                title: '年龄',
                dataIndex: '年龄',
                key: '年龄',
            },
            {
                title: '住址',
                dataIndex: '住址',
                key: '住址',
            }
        ]
    },
]
const EditableCell = (
    {
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}
) => {
    console.log('12312:',editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    restProps);
    let inputNode = <Input />;
    // switch (inputType) {
    //     case 'number':
    //         inputNode = <InputNumber />
    //         break;
    //     case 'texts':
    //         inputNode = <Input />
    //         break;
    //     case 'date':
    //         inputNode = <DatePicker picker="year" />
    //         break;
    //     case 'vote':
    //         inputNode = <Checkbox>123123</Checkbox>
    //         break;
    //     default:
    //         // inputNode = <Input/>
    //         break;
    // }
    return (
        <td {...restProps}>
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                        required: true,
                        message: `Please Input ${title}`
                    }
                ]}
            >
                {inputNode}
            </Form.Item>
        </td>
    )
}
const PreMeetingTasks = () => {
    const [form] = Form.useForm();
    const [tabItem, setTabItem] = useState(tabsDataAll)
    const [renameModalOpen, setRenameModalOpen] = useState({ visible: false, id: '', titleName: '', renameType: 'tab' })
    const [explainModalOpen, setExplainModalOpen] = useState({ visible: false, id: 0, explain: '' })
    const [activeTab, setActiveTab] = useState({ tipVisible: true, activeKey: 0, tipStr: "" })
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const tabsBtnStyle = {
        width: '100%'
    }

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
    };
    const pagiNa = { position: ["none", "none"] }
    useEffect(() => {
        setActiveTab({ ...activeTab, tipStr: tabItem[0].tableDescribe })
    }, [])
    const handleTabsTitle = (titleName, id) => {
        return <div>
            <label style={{ margin: "0 15px" }}>{titleName}</label>
            <Tooltip placement="bottomRight" title={tabsTitleItem(titleName, id)} color={'white'}>
                {tooltipIcon}
            </Tooltip>
        </div>

    }
    const copyClick = (key) => {
        let newTab = { ...tabItem[key], id: tabItem.length, tabName: tabItem[key].tabName + '(copy)' }
        setTabItem([...tabItem, newTab])
    }
    const setRule = () => {
        // console.log(tabItems)
    }
    const handleRename = (id, titleName, renameType) => {
        setRenameModalOpen({ visible: true, id: id, titleName: titleName, renameType: renameType })
    }
    const addExplain = (id) => {
        setExplainModalOpen({ visible: true, id: id })
    }
    //导出子表方法
    const exportSubtable = (titleName, key) => {
        // console.log("key", key)
        let workbook = new ExcelJS.Workbook();
        let sheet = workbook.addWorksheet(titleName, {
            views: [{ showGridLines: true }]
        })
        let columnArr = [];
        for (let i in tabItem[key].columns) {
            let tempObj = { name: "" };
            tempObj.name = tabItem[key].columns[i].title
            // console.log(columns[i].title);
            columnArr.push(tempObj)
        }

        sheet.addTable({
            name: tabItem[key].tabName,
            ref: "A1",
            headerRow: true,
            totalsRow: false,
            style: {
                theme: "TableStyleMedium2",
                showRowStripes: false,
                width: 200
            },

            columns: columnArr ? columnArr : [{ name: "" }],
            rows: tabItem[key].dataSource.map((item) => {
                return [item.name, item.age, item.address];
            })
        })
        const writeFile = (fileName, content) => {
            const link = document.createElement("a");
            const blob = new Blob([content], {
                type: "application/vnd.ms-excel;charset=utf-8;"
            });
            link.download = fileName;
            link.href = URL.createObjectURL(blob);
            link.click();
        }
        workbook.xlsx.writeBuffer().then((buffer) => {
            writeFile(titleName, buffer)
        })
    }
    // 删除子标签
    const delSubtable = (key) => {
        if (tabItem.length === 1) {
            message.warning('禁止删除')
        } else {

            let newTabItem = [...tabItem]
            newTabItem.splice(key, 1)
            for (let i = key; i < newTabItem.length; i++) {
                newTabItem[i].id = newTabItem[i].id - 1
            }
            setTabItem(newTabItem)
            // key===0 ? setActiveTab({tipVisible:false,activeKey:0,tipStr:""}):setActiveTab({tipVisible:false,activeKey:0,tipStr:""})
            message.success('删除成功')
        }

    }
    const colInsert = (id, direction) => {
        let newTabItem = [...tabItem]
    }
    const tabsTitleItem = (titleName, id) => {
        return <div key={id} style={{ width: "116px" }}>
            <Button type="text" style={tabsBtnStyle} onClick={() => handleRename(id, titleName, "tab")}>重命名</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => copyClick(id)}>复制子表</Button>
            <Button type="text" style={tabsBtnStyle} onClick={setRule}>设置填表规则</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => addExplain(id)}>添加表说明</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => exportSubtable(titleName, id)}>导出子表</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => delSubtable(id)}>删除子表</Button>
        </div>
    }
    const tableTitleItem = (colName, id) => {
        return <div key={id} style={{ width: "116px" }}>
            <Button type="text" style={tabsBtnStyle} onClick={() => handleRename(id, colName, "col")}>重命名列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => handleRename(id, colName)}>列类型转换</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "left")}>向左插入列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "right")}>向右插入列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => handleRename(id, colName)}>删除列</Button>
        </div>
    }
    const columnsHandle = (id, title) => {
        return <div>
            <label style={{ margin: "0 15px" }}> {title}</label>
            <Tooltip placement="bottomRight" title={() => tableTitleItem(title, id)} color={'white'}>
                {tooltipIcon}
            </Tooltip>
        </div>
    }
    const edit = (record) => {
        console.log("record", record);
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    }
    const components = ()=>{
        return{
        body: {
          cell: ()=>EditableCell(),
        }}
      };
    const tabsDataItem = tabItem?.map((item) => {
        return {
            label: handleTabsTitle(item.tabName, item.id),
            key: item.id,
            children:
                <Form form={form} component={false}>
                    <Table
                        key={item.id}
                        components={()=>components()}
                        bordered
                        rowClassName="editable-row"
                        dataSource={item.dataSource}
                        columns={[...item.columns,
                        {
                            title: '操作',
                            dataIndex: 'operation',
                            render: (_, record) => {
                                const editable = isEditing(record);
                                return editable ? (
                                    <span>
                                        <Typography.Link
                                            onClick={() => save(record.key)}
                                            style={{
                                                marginRight: 8,
                                            }}
                                        >
                                            保存
                                        </Typography.Link>
                                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                            <a>取消</a>
                                        </Popconfirm>
                                    </span>
                                ) : (
                                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                        编辑
                                    </Typography.Link>
                                );
                            },
                        }
                    ]}
                        pagination={pagiNa} />
                </Form>,
            closable: false
        }
    })
    useEffect(() => {
        // openNotification()
    }, [])
    const renameChange = () => {
        let newTabItem = [...tabItem]
        if (renameModalOpen.renameType === 'tab') {
            newTabItem[renameModalOpen.id].tabName = renameModalOpen.newName
        } else {
            newTabItem[activeTab.activeKey].columns[renameModalOpen.id] = {
                title: renameModalOpen.newName,
                dataIndex: renameModalOpen.newName,
                key: renameModalOpen.newName
            }
            newTabItem[activeTab.activeKey].dataSource.forEach((item) => {
                let titleNameTemp = item[renameModalOpen.titleName]
                delete item[renameModalOpen.titleName]
                return item[renameModalOpen.newName] = titleNameTemp
            })
        }
        setTabItem(newTabItem)
        setRenameModalOpen({ visible: false })
    }
    const setRenameModalCancel = () => {
        setRenameModalOpen({ visible: false })
    }
    const BtnText = () => {
        console.log(activeTab)
    }
    const addTabItem = () => {
        let newTabItem = [
            ...tabItem,
            {
                id: tabItem.length,
                tabName: "未命名表格",
                tableDescribe: "",
                tableRule: "",
                dataSource: [
                    {
                        key: '1',
                        name: '',
                    },
                    {
                        key: '2',
                        name: '',
                    }, {
                        key: '3',
                        name: '',
                    },
                ],
                columns: [
                    {
                        title: '名称',
                        dataIndex: 'name',
                        key: 'name',
                    }
                ]
            },
        ]
        setActiveTab({ tipVisible: false, activeKey: newTabItem.length - 1, tipStr: "" })
        setTabItem(newTabItem)
    }
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            addTabItem();
        }
    };
    const addExplainTip = () => {
        let newTabItem = [...tabItem]
        newTabItem[explainModalOpen.id].tableDescribe = explainModalOpen.explain
        setTabItem(newTabItem)
        setActiveTab({ tipVisible: true, activeKey: explainModalOpen.id, tipStr: explainModalOpen.explain })
        setExplainModalOpen({ visible: false })
    }
    const tipBtn = {
        marginRight: "25px"
    }
    const tableBtn = {
        float: "right",
        marginRight: "15px"
    }
    const tipContent = (

        <div>
            <TextArea style={{ height: "240px", width: "450px", color: "#1d2129" }} bordered={false} disabled maxLength={200} value={activeTab.tipStr} />
        </div>
    );
    const tableTabClick = (key) => {

        setActiveTab({ tipVisible: true, activeKey: key, tipStr: tabItem[key]?.tableDescribe })
        console.log('key:', tabItem[key]?.tableDescribe);
    }
    return (
        <div>
            <div style={tableBtn}>
                <Button onClick={BtnText} style={tipBtn}>{shareIcon}</Button>
                <Button onClick={BtnText} style={tipBtn}>{importIcon}</Button>
                <Popover placement="bottomRight" title={"页面填写说明："} content={tipContent} defaultOpen={activeTab.tipStr === ""} open={activeTab.tipVisible && activeTab.tipStr !== ""} trigger="click" >
                    <Button onClick={() => setActiveTab({ ...activeTab, tipVisible: !activeTab.tipVisible })}>{tipIcon}</Button>
                </Popover>
            </div>


            <Tabs defaultActiveKey={0} onTabClick={(key) => tableTabClick(key)} type="editable-card" items={tabsDataItem} style={tabsStyle} hideAdd={false} onEdit={onEdit} />


            {/* 重命名modal */}
            {renameModalOpen.visible ? <Modal open={renameModalOpen.visible} title={`重命名${renameModalOpen.renameType === "tab" ? "表" : "列"}`} onCancel={() => setRenameModalCancel()} onOk={() => renameChange()} okText="确定" cancelText="取消">
                <Input placeholder={renameModalOpen.titleName} onChange={(e) => { setRenameModalOpen({ ...renameModalOpen, newName: e.target.value }); }} />
            </Modal> : null}

            {/* 添加表说明modal */}
            {explainModalOpen.visible ? <Modal open={explainModalOpen.visible} title="添加表说明" onCancel={() => setExplainModalOpen({ visible: false })} onOk={() => addExplainTip()} okText="确定" cancelText="取消">
                <TextArea
                    showCount
                    maxLength={200}
                    style={{ height: 120 }}
                    placeholder="表说明"
                    defaultValue={activeTab.tipStr}
                    onChange={(e) => setExplainModalOpen({ ...explainModalOpen, explain: e.target.value })}></TextArea>
            </Modal> : null}

            {/* 插入列 */}
            {/* <Modal>
                <Form>
                    <Form.Item>
                        <Input  />
                    </Form.Item>
                    <Form.Item>
                        <Input  />
                    </Form.Item>
                </Form>
            </Modal> */}
            <Button onClick={BtnText}>哈哈哈哈哈</Button>
        </div>
    )
}
export default PreMeetingTasks;