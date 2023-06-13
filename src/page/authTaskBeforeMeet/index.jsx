import { useState, useEffect, useRef, useContext } from "react";
import React from 'react';
import moment from 'moment'
import { Table, Tabs, Button, Input, Modal, Popover, message, Checkbox, Alert, Form, InputNumber, DatePicker, Select } from "antd";
import ExcelJS from "exceljs";
import './styles.css';
import  _  from "lodash";
const indexStyle = {width:"42px",display:"flex", alignItems:"center"}
const tipIcon = <svg t="1681442549332" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1511" width="20" height="20"><path d="M904.32 453.952c-12.736-12.736-33.408-12.736-46.144 0L512 800.128 165.824 453.952c-12.736-12.736-33.408-12.736-46.144 0L73.536 500.096c-12.736 12.736-12.736 33.408 0 46.144l415.36 415.36c12.736 12.736 33.408 12.736 46.144 0l415.36-415.36c12.736-12.736 12.736-33.408 0-46.144L904.32 453.952zM488.896 570.048c12.736 12.736 33.408 12.736 46.144 0l415.36-415.36c12.736-12.736 12.736-33.408 0-46.144L904.32 62.336c-12.736-12.736-33.408-12.736-46.144 0L512 408.512 165.824 62.336c-12.736-12.736-33.408-12.736-46.144 0L73.536 108.48c-12.736 12.736-12.736 33.408 0 46.144L488.896 570.048z" p-id="1512" fill="#8a8a8a"></path></svg>
const shareIcon = <svg t="1681442633310" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1719" width="20" height="20"><path d="M810.688 362.688c-40.64 0-77.376-16.32-104.32-42.688L453.824 457.792C458.752 475.136 462.208 493.056 462.208 512c0 18.944-3.52 36.864-8.448 54.208L706.368 704c26.944-26.304 63.68-42.688 104.32-42.688 82.496 0 149.312 66.88 149.312 149.312S893.12 960 810.688 960s-149.312-66.88-149.312-149.312c0-10.304 1.024-20.352 3.008-30.016l-252.352-137.664c-36.48 41.472-89.344 68.096-148.864 68.096C153.152 711.104 64 621.952 64 512s89.152-199.104 199.104-199.104c59.584 0 112.384 26.688 148.864 68.096l252.352-137.664c-1.984-9.728-3.008-19.712-3.008-30.016C661.312 130.88 728.192 64 810.688 64 893.12 64 960 130.88 960 213.312S893.12 362.688 810.688 362.688z" p-id="1720" fill="#8a8a8a"></path></svg>
const saveIcon = <svg t="1683544468409" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4128" width="20" height="20"><path d="M919.466667 264.533333V832c0 46.933333-38.4 85.333333-85.333334 85.333333h-640c-46.933333 0-85.333333-38.4-85.333333-85.333333V192c0-46.933333 38.4-85.333333 85.333333-85.333333h567.466667c6.4 0 10.666667 2.133333 14.933333 6.4l136.533334 136.533333c4.266667 4.266667 6.4 8.533333 6.4 14.933333z" fill="#1890FF" p-id="4129"></path><path d="M322.133333 106.666667h384v213.333333h-384zM258.133333 640h512v277.333333h-512z" fill="#FFFFFF" p-id="4130"></path><path d="M599.466667 149.333333h64v128h-64zM364.8 725.333333h298.666667v21.333334h-298.666667zM364.8 810.666667h298.666667v21.333333h-298.666667z" fill="#69C0FF" p-id="4131"></path></svg>
const { TextArea } = Input;
const tabsDataAll = [
    {
        id: 0,
        tabName: "与会人员",
        tableDescribe: "111111",
        tableRule: "",
        dataSource: [
            {
                key: 0,
                工号: "",
                姓名: "",
                性别: "",
                部门: "",
                职务描述: "",
                汇报对象: "",
                年龄: "",
                学历: "",
                司龄: "",
                联系方式: "",
            },
            {
                key: 1,
                工号: "",
                姓名: "",
                性别: "",
                部门: "",
                职务描述: "",
                汇报对象: "",
                年龄: "",
                学历: "",
                司龄: '',
                联系方式: "",
            }, {
                key: 2,
                工号: "",
                姓名: "",
                性别: "",
                部门: "",
                职务描述: "",
                汇报对象: "",
                年龄: '',
                学历: "",
                司龄: '',
                联系方式: "",
            }
        ],
        columns: [
            {
                title: '工号',
                dataIndex: '工号',
                key: 1,
                type: 'text',
                editable: true
            },
            {
                title: '姓名',
                dataIndex: '姓名',
                key: 2,
                type: 'text',
                editable: true
            },
            {
                title: '性别',
                dataIndex: '性别',
                key: 3,
                type: 'text',
                editable: true
            },
            {
                title: '部门',
                dataIndex: '部门',
                key: 4,
                type: 'text',
                editable: true
            },
            {
                title: '职务描述',
                dataIndex: '职务描述',
                key: 5,
                type: 'text',
                editable: true
            },
            {
                title: '汇报对象',
                dataIndex: '汇报对象',
                key: 6,
                type: 'text',
                editable: true,

            },
            {
                title: '年龄',
                dataIndex: '年龄',
                key: 7,
                type: 'number',
                editable: true,
            },
            {
                title: '学历',
                dataIndex: '学历',
                key: 8,
                type: 'text',
                editable: true
            },
            {
                title: '司龄',
                dataIndex: '司龄',
                key: 9,
                type: 'number',
                editable: true
            },
            {
                title: '联系方式',
                dataIndex: '联系方式',
                key: 10,
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
                key: 0,
                部门: '',
                可访谈时间段: "",
                姓名: '',
            },
            {
                key: 1,
                部门: '',
                可访谈时间段: "",
                姓名: '',
            },
            {
                key: 2,
                部门: '',
                可访谈时间段: "",
                姓名: '',
            },
        ],
        columns: [
            {
                title: '姓名',
                dataIndex: '姓名',
                key: 1,
                type: 'text',
                editable: true,

            },
            {
                title: '部门',
                dataIndex: '部门',
                key: 2,
                type: 'text',
                editable: true,

            },
            {
                title: '可访谈时间段',
                dataIndex: '可访谈时间段',
                key: 3,
                type: 'date',
                editable: true,
            },
        ]
    }
]
const indexNumStyle = {margin:"auto"}
const tabsStyle = {
    width: "98%"
}
const tipBtn = {
    marginRight: "25px"
}
const saveTipBtn = {
    marginRight: "25px",
    fontWeight:400
}
const tableBtn = {
    float: "right",
    marginRight: "15px"
}
const textAreaStyle = {
    height: "240px", width: "450px", color: "#1d2129"
}
const formStyle = {
    maxWidth: 600,
}
const formItemStyle = {
    margin: 0,
}
const tableDivStyle = {
    padding: '0 15px'
}
const formWrop = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    }
}
const formBtnStyle = {
    offset: 14,
    span: 10,
}
const tableBtnStyle = {
    display: "flex", flexWrap: "nowrap"
}
const addColRowBtn = {
    col: { backgroundColor: "#fafafa", width: "150px", height: "55px" },
    row: { float: "left", backgroundColor: "#fafafa", width: "44px" }
}
const textAreaRows = {
    minRows: 1,
    maxRows: 1,
}
const checkboxStyle = { marginLeft: "15px" }
const formButton = { marginRight: '15px' }
const alertStyle = { marginBottom: "15px" }
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    type,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    const [date, setDate] = useState('')
    useEffect(() => {
        if (editing) {
            type === "date" && setDate(record[dataIndex])
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        // console.log("editing", editing);
        form.setFieldsValue({
            [dataIndex]: type === "date" ? moment(record[dataIndex] ? record[dataIndex] : moment().year(), "YYYY") : record[dataIndex],
            // [dataIndex]:  record[dataIndex],
        });
    };
    const save = async () => {
        console.log("reocrd",record);
        try {
            const values = await form.validateFields();
            console.log("record,values",record, values);
            toggleEdit();
            handleSave({
                ...record,
                ...values
            });
        } catch (errInfo) {
        }
    };
    const saveDate = () => {
        toggleEdit();
        let dateCur = {
            ...record
        }
        dateCur[dataIndex] = date ? date : moment().year()
        handleSave({
            ...dateCur
        });
    }
    const saveCheck = (e) => {
        let dateCur = {
            ...record,
        }
        dateCur[dataIndex] = e.target.checked
        form.setFieldsValue({
            [dataIndex]: e.target.checked
        })
        handleSave({
            ...dateCur
        });
    }
    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={formItemStyle}
                name={dataIndex}
            >
                {type === "text" ? <TextArea ref={inputRef} onPressEnter={save} onBlur={save} maxLength={50} autoSize={textAreaRows} showCount /> : type === "date"
                    ? <DatePicker clearIcon={null} onChange={(date, dateString) => { setDate(dateString) }} placeholder="选择年份" ref={inputRef} onPressEnter={saveDate} onBlur={saveDate} format={'YYYY'} picker="year" />
                    : type === "vote" ? <Checkbox ref={inputRef} checked={form.getFieldValue(dataIndex)} style={checkboxStyle} onChange={saveCheck}></Checkbox> : <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={tableDivStyle}
                onClick={toggleEdit}
            >
                {children[1] === '' ? '-' : children}
            </div>
        );
    }
    return <td  {...restProps}>{childNode}</td>;
};
const  AuthTaskBeforeMeet = () => {
    const [renameModalOpen, setRenameModalOpen] = useState({ visible: false, id: '', titleName: '', renameType: 'tab' })
    const [tabItem, setTabItem] = useState(tabsDataAll)
    const [activeTab, setActiveTab] = useState({ tipVisible: true, id: 0, tipStr: tabsDataAll[0].tableDescribe })
    const [explainExist, setExplainExist]  = useState(tabItem[0].tableDescribe!=="")
    const [explainModalOpen, setExplainModalOpen] = useState({ visible: false, id: 0, explain: '' })
    const [insertCol, setInsertCol] = useState({ insVisible: false, id: 0, direction: '' })
    const [addTabOpen, setAddTabOpen] = useState({ visible: false, newTabName: "" })
    const tableTabClick = (key) => {
        setExplainExist(tabItem[key].tableDescribe!=="")
        setActiveTab({ tipVisible: true, id: key, tipStr: tabItem[key].tableDescribe })
    }
    const addTabItem = () => {
        if (addTabOpen.newTabName === "") {
            message.warning('子表名不能为空')
            return
        }
        for (let item of tabItem) {
            if (item.tabName === addTabOpen.newTabName) {
                message.warning("已存在相同子表名")
                return
            }

        }
        let newTabItem = [
            ...tabItem,
            {
                id: tabItem.length,
                tabName: addTabOpen.newTabName,
                tableDescribe: "",
                tableRule: "",
                dataSource: [
                    {
                        key: 0,
                        名称: '',
                    },
                    {
                        key: 1,
                        名称: '',
                    }, {
                        key: 2,
                        名称: '',
                    },
                ],
                columns: [
                    {
                        title: '名称',
                        dataIndex: '名称',
                        key: 0,
                        type: 'text',
                        editable: true
                    }
                ]
            },
        ]
        setAddTabOpen({ newTabName: "", visible: false })
        setActiveTab({ tipVisible: false, id: newTabItem.length - 1, tipStr: "" })
        setTabItem(newTabItem)
    }

    const pagiNa = { position: ["none", "none"], pageSize: 50 }

    const tipContent = (
        <div>
            <TextArea style={textAreaStyle} bordered={false} disabled maxLength={200} value={activeTab.tipStr} />
        </div>
    );


    const BtnText = () => {


    }
    const setRenameModalCancel = () => {
        setRenameModalOpen({ visible: false })
    }
    const renameChange = () => {
        let newTabItem = [...tabItem]
        if (renameModalOpen.renameType === 'tab') {
            newTabItem[renameModalOpen.id].tabName = renameModalOpen.newName
        } else {
            newTabItem[activeTab.id].columns[renameModalOpen.id] = {
                ...newTabItem[activeTab.id].columns[renameModalOpen.id],
                title: renameModalOpen.newName,
                dataIndex: renameModalOpen.newName,
            }
            newTabItem[activeTab.id].dataSource.forEach((item) => {
                let titleNameTemp = item[renameModalOpen.titleName]
                delete item[renameModalOpen.titleName]
                return item[renameModalOpen.newName] = titleNameTemp
            })
            // console.log(newTabItem[activeTab.id], renameModalOpen);
        }
        setTabItem(newTabItem)
        setRenameModalOpen({ visible: false })
    }
    const addExplainTip = () => {
        let newTabItem = [...tabItem]
        newTabItem[explainModalOpen.id].tableDescribe = explainModalOpen.explain
        setTabItem(newTabItem)
        setActiveTab({ tipVisible: true, id: explainModalOpen.id, tipStr: explainModalOpen.explain })
        setExplainModalOpen({ visible: false })
    }
    const colInsert = (id, direction) => {
        console.log("insertId-e",id);
        // e.stopPropagation 
        setInsertCol({ insVisible: true, id: id, direction: direction })
    }

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const insModalCancel = () => {
        setInsertCol({ ...insertCol, insVisible: false })
    }
    const handleSave = (row) => {
        let newData = [...tabItem];
        // debugger
        newData[activeTab.id].dataSource[row.key]=row
        // debugger
        setTabItem(newData)
    };

    //   转换类型后清空当前列
    const clearCol = (colName) => {
        let newData = [...tabItem]
        newData[activeTab.id].dataSource.forEach((item) => {
            item[colName] = ""
        })
        setTabItem(newData)
    }

    const onInsertFinish = (values) => {
        let newData = [...tabItem]
        let insertData = ""

        if (insertCol.direction === "trans") {
            if (newData[activeTab.id].columns[insertCol.id].type === values.colType) {
                return
            }

            newData[activeTab.id].columns[insertCol.id] = {
                ...newData[activeTab.id].columns[insertCol.id],
                type: values.colType
            }

            newData[activeTab.id].dataSource.forEach((item) => {
                values.colType === "date" ? item[values.colName] = insertData : clearCol(values.colName)
            })
        } else {
            if (insertCol.direction === "left") {
                newData[activeTab.id].columns.splice(insertCol.id, 0, { title: values.colName, dataIndex: values.colName, key: insertCol.id, type: values.colType, editable: true })
            } else if (insertCol.direction === "right") {
                newData[activeTab.id].columns.splice(insertCol.id + 1, 0, { title: values.colName, dataIndex: values.colName, key: insertCol.id, type: values.colType, editable: true })
            }

            for (let index = 0; index < newData[activeTab.id].columns.length; index++) {
                newData[activeTab.id].columns[index].key = index
            }

            newData[activeTab.id].dataSource.forEach((item) => {
                item[values.colName] = insertData
            })
        }

        setTabItem(newData)
        setInsertCol({ insVisible: false })
    }
    const tableEdit = (editType) => {
        if (editType === "row") {
            let newData = [...tabItem]
            let rowProp = newData[activeTab.id].columns.map((item) => {
                return { name: item.dataIndex, type: item.type }
            })
            let newRow = {
                key: tabItem[activeTab.id].dataSource.length
            }
            rowProp.forEach((item) => {
                // item.type==="date"? newRow[item.name]=moment().year():newRow[item.name]=""
                newRow[item.name] = ""
            })

            newData[activeTab.id].dataSource = [
                ...tabItem[activeTab.id].dataSource,
                newRow
            ]
            setTabItem(newData)
        } else {
            colInsert(tabItem[activeTab.id].columns.length - 1, "right")
        }
    }
    return (
        <div>
            <div style={tableBtn}>
                <Button style={saveTipBtn} >{saveIcon}</Button>
                <Button onClick={BtnText} style={tipBtn}>{shareIcon}</Button>
                {explainExist && <Popover zIndex={900} placement="bottomRight" title={"页面填写说明："} content={tipContent} defaultOpen={activeTab.tipStr !== ""} open={activeTab.tipVisible && activeTab.tipStr !== ""} trigger="click" >
                    <Button onClick={() => setActiveTab({ ...activeTab, tipVisible: !activeTab.tipVisible })}>{tipIcon}</Button>
                </Popover>}
                
            </div>

            <Tabs defaultActiveKey={0}
                onTabClick={(key) => { tableTabClick(key) }}
                activeKey={activeTab.id} type="card" hideAdd={false} items={tabItem.map((item) => {
                    return {
                        label: item.tabName,
                        key: item.id,
                        children: null,
                        closable: false
                    }
                })} style={tabsStyle}  />
            <div style={tableBtnStyle}>
                <Table
                    key={activeTab.id}
                    className={"ant-table"}
                    components={components}
                    // scroll={{ x: true }}
                    bordered
                    rowClassName={() => 'editable-row'}
                    dataSource={[...tabItem[activeTab.id].dataSource]}
                    columns={[{
                        title: "#",
                        key: 0,
                        render: (text, record, index) => {
                            return <div style={indexStyle}>
                                <label htmlFor="" style={indexNumStyle}>{index + 1}</label>
                            </div>
                        },
                    },...tabItem[activeTab.id].columns].map((item) => {
                        return {
                            ...item,
                            title: item.title === "#" ? "#" :item.title
                        }
                    }).map((col) => {
                        if (!col.editable) {
                            return col;
                        }
                        return {
                            ...col,
                            onCell: (record) => ({
                                record,
                                editable: col.editable,
                                dataIndex: col.dataIndex,
                                title: col.title,
                                type: col.type,
                                handleSave,
                            }),
                        };
                    })}
                    pagination={pagiNa}
                />
            </div>

            <Button onClick={() => tableEdit("row")} style={addColRowBtn.row}>+</Button>
            {/* 重命名modal */}
            {renameModalOpen.visible ? <Modal open={renameModalOpen.visible} title={`重命名${renameModalOpen.renameType === "tab" ? "表" : "列"}`}
                onCancel={() => setRenameModalCancel()}
                onOk={() => renameChange()}
                okText="确定" cancelText="取消">
                <Input placeholder={renameModalOpen.titleName} onChange={(e) => { setRenameModalOpen({ ...renameModalOpen, newName: e.target.value }); }} />
            </Modal> : null}
            {/* 添加表说明modal */}
            {explainModalOpen.visible ? <Modal zIndex={1000} open={explainModalOpen.visible} title="添加表说明" onCancel={() => setExplainModalOpen({ visible: false })} onOk={() => addExplainTip()} okText="确定" cancelText="取消">
                <TextArea showCount maxLength={200} rows={6} onChange={(e) => setExplainModalOpen({ ...explainModalOpen, explain: e.target.value })} defaultValue={explainModalOpen.explain} />
            </Modal> : null}
            {insertCol.insVisible ? <Modal open={insertCol.insVisible} title={insertCol.direction === "trans" ? "列类型转换" : "插入列"} footer={null} onCancel={() => insModalCancel()}>
                <Form
                    name="basic"
                    labelCol={formWrop.labelCol}
                    wrapperCol={formWrop.wrapperCol}
                    style={formStyle}
                    initialValues={insertCol.direction === "trans" ? { colName: tabItem[activeTab.id].columns[insertCol.id].title, colType: tabItem[activeTab.id].columns[insertCol.id].type } : {}}
                    onFinish={onInsertFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="列名"
                        name="colName"

                        rules={[
                            {
                                required: true,
                                message: '请输入列名',
                            },
                        ]}
                    >
                        <Input disabled={insertCol.direction === "trans"} />
                    </Form.Item>

                    <Form.Item
                        label="列类型"
                        name="colType"
                        rules={[
                            {
                                required: true,
                                message: '请选择列类型',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="text">文本</Select.Option>
                            <Select.Option value="number">数字</Select.Option>
                            <Select.Option value="date">日期</Select.Option>
                            <Select.Option value="vote">投票</Select.Option>
                        </Select>
                    </Form.Item>
                    {insertCol.direction === "trans" && <Alert
                        style={alertStyle}
                        message="列类型更改后将清空本列数据"
                        type="warning"
                        showIcon
                    />}

                    <Form.Item
                        wrapperCol={formBtnStyle}
                    >
                        <Button style={formButton} onClick={() => insModalCancel()}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>

                    </Form.Item>
                </Form>
            </Modal> : null}
            {addTabOpen.visible && <Modal title="新建子表" open={addTabOpen.visible} okText="确定" cancelText="取消" onCancel={() => setAddTabOpen({ visible: false })} onOk={() => addTabItem()}>
                <Input placeholder="请输入新子表名" onChange={(e) => { setAddTabOpen({ ...addTabOpen, newTabName: e.target.value }) }} />
            </Modal>}
            
        </div>
    )
}
export default AuthTaskBeforeMeet;