import { useState, useEffect, useRef, useContext } from "react";
import React from 'react';
import moment from 'moment'
import { Table, Tabs, Tooltip, Button, Input, Modal, Popover, message, Alert, Form, InputNumber, DatePicker, Select } from "antd";
import ExcelJS from "exceljs";
import './styles.css';
const tooltipIcon = <svg t="1681116195214" className="icon" viewBox="0 0 1024 1024" style={{ float: "right", margin:"auto 0",lineHeight:'2' }} version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3817" data-spm-anchor-id="a313x.7781069.0.i2" width="14" height="14"><path d="M548.352 730.624l394.24-360.96c21.504-19.456 23.04-53.248 3.072-74.24-19.456-21.504-53.248-23.04-74.24-3.072l-358.912 328.704L153.088 291.84c-21.504-19.456-54.784-17.92-74.24 3.584-19.456 21.504-17.92 54.784 3.584 74.24l394.752 360.448c1.024 0.512 1.536 1.536 2.56 2.048 19.456 16.896 49.152 16.384 68.608-1.536z" p-id="3818"></path></svg>
const tipIcon = <svg t="1681442549332" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1511" width="20" height="20"><path d="M904.32 453.952c-12.736-12.736-33.408-12.736-46.144 0L512 800.128 165.824 453.952c-12.736-12.736-33.408-12.736-46.144 0L73.536 500.096c-12.736 12.736-12.736 33.408 0 46.144l415.36 415.36c12.736 12.736 33.408 12.736 46.144 0l415.36-415.36c12.736-12.736 12.736-33.408 0-46.144L904.32 453.952zM488.896 570.048c12.736 12.736 33.408 12.736 46.144 0l415.36-415.36c12.736-12.736 12.736-33.408 0-46.144L904.32 62.336c-12.736-12.736-33.408-12.736-46.144 0L512 408.512 165.824 62.336c-12.736-12.736-33.408-12.736-46.144 0L73.536 108.48c-12.736 12.736-12.736 33.408 0 46.144L488.896 570.048z" p-id="1512" fill="#8a8a8a"></path></svg>
const shareIcon = <svg t="1681442633310" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1719" width="20" height="20"><path d="M810.688 362.688c-40.64 0-77.376-16.32-104.32-42.688L453.824 457.792C458.752 475.136 462.208 493.056 462.208 512c0 18.944-3.52 36.864-8.448 54.208L706.368 704c26.944-26.304 63.68-42.688 104.32-42.688 82.496 0 149.312 66.88 149.312 149.312S893.12 960 810.688 960s-149.312-66.88-149.312-149.312c0-10.304 1.024-20.352 3.008-30.016l-252.352-137.664c-36.48 41.472-89.344 68.096-148.864 68.096C153.152 711.104 64 621.952 64 512s89.152-199.104 199.104-199.104c59.584 0 112.384 26.688 148.864 68.096l252.352-137.664c-1.984-9.728-3.008-19.712-3.008-30.016C661.312 130.88 728.192 64 810.688 64 893.12 64 960 130.88 960 213.312S893.12 362.688 810.688 362.688z" p-id="1720" fill="#8a8a8a"></path></svg>
const importIcon = <svg t="1681442852436" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2023" width="20" height="20"><path d="M877.614 743.251v218.749h-731.227v-218.861c0-30.205 23.399-54.673 52.254-54.673s52.254 24.468 52.254 54.729c0 0 0 0.056 0 0.056v109.346h522.264v-109.403c0-30.205 23.399-54.673 52.254-54.673s52.254 24.468 52.254 54.729c-0.056-0.056-0.056-0.056-0.056 0zM752.067 418.192c-10.181 10.688-26.718 10.688-36.955 0l-150.914-158.057v400.938c0 15.13-11.7 27.337-26.099 27.337h-52.198c-14.399 0-26.099-12.263-26.099-27.337v-400.938l-150.914 158.057c-10.181 10.688-26.718 10.688-36.955 0l-36.955-38.643c-10.181-10.688-10.181-28.012 0-38.699l258.574-270.835c10.181-10.688 26.718-10.688 36.899 0l258.517 270.835c10.181 10.688 10.181 28.012 0 38.699l-36.899 38.643z" p-id="2024" fill="#8a8a8a"></path></svg>
const { TextArea } = Input;
const tabsDataAll = [
    {
        id: 0,
        tabName: "与会人员",
        tableDescribe: "访谈要求：1、访谈时间30-60min/人，视频会议or电话形式；2、可访谈时间：2月4日-2月6日全天，10:00-22:00（填写参考高管访谈时间安排表）；\n访谈对象：1、人数要求7-8人；2、选择标准：对组织有影响力、对公司理解透彻；老人（8年以上）和新人（2年以内）无比例要求；",
        tableRule: "",
        dataSource: [
            {
                key: 0,
                工号: "BYT20230101",
                姓名: "王博",
                性别: "男",
                部门: "业务开发部门",
                职务描述: "业务开发业务开发业务开发业务开发业务开发业务开发业务开发",
                汇报对象: "leader",
                年龄: 25,
                学历: "本科",
                司龄: 5,
                联系方式: "17328888888",
                入职年份:"2023"
            },
            {
                key: 1,
                工号: "",
                姓名: "",
                性别: "",
                部门: "",
                职务描述: "",
                汇报对象: "",
                年龄: "111",
                学历: "",
                司龄: '',
                联系方式: "",
                入职年份:"2028"
            }, {
                key: 2,
                工号: "",
                姓名: "",
                性别: "",
                部门: "",
                职务描述: "",
                汇报对象: "",
                年龄: '222',
                学历: "",
                司龄: '',
                联系方式: "",
                入职年份:"2020"
            }
        ],
        columns: [
            {
                title:"#",
                render: (text, record, index) => index + 1,
            },
            {
                title: '工号',
                dataIndex: '工号',
                key: 0,
                type: 'text',
                editable: true
            },
            {
                title: '姓名',
                dataIndex: '姓名',
                key: 1,
                type: 'text',
                editable: true
            },
            {
                title: '性别',
                dataIndex: '性别',
                key: 2,
                type: 'text',
                editable: true
            },
            {
                title: '部门',
                dataIndex: '部门',
                key: 3,
                type: 'text',
                editable: true
            },
            {
                title: '职务描述',
                dataIndex: '职务描述',
                key: 4,
                type: 'text',
                editable: true
            },
            {
                title: '汇报对象',
                dataIndex: '汇报对象',
                key: 5,
                type: 'text',
                editable: true,

            },
            {
                title: '年龄',
                dataIndex: '年龄',
                key: 6,
                type: 'number',
                editable: true,
            },
            {
                title: '学历',
                dataIndex: '学历',
                key: 7,
                type: 'text',
                editable: true
            },
            {
                title: '司龄',
                dataIndex: '司龄',
                key: 8,
                type: 'number',
                editable: true
            },
            {
                title: '入职年份',
                dataIndex: '入职年份',
                key: 9,
                type: 'date',
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
                工号: '1111',
                出生日期: "2023",
                姓名: '西湖区湖底公园1号',
            },
            {
                key: 1,
                工号: '22222',
                出生日期: "2023",
                姓名: '西湖区湖底公园1号',
            },
            {
                key: 2,
                工号: '3333',
                出生日期: "2023",
                姓名: '西湖区湖底公园1号',
            },
        ],
        columns: [
            {
                title:"#",
                render: (text, record, index) => index + 1,
            },
            {
                title: '工号',
                dataIndex: '工号',
                key: 0,
                type: 'text',
                editable: true,
                render: (text) => (
                    <div style={{ padding: '0' }}>{text}</div>
                  ), // 去除单元格内边距
            },
            {
                title: '姓名',
                dataIndex: '姓名',
                key: 1,
                type: 'text',
                editable: true,
                render: (text) => (
                    <div style={{ padding: '0' }}>{text}</div>
                  ), // 去除单元格内边距
            },
            {
                title: '出生日期',
                dataIndex: '出生日期',
                key: 2,
                type: 'date',
                editable: true,
                render: (text) => (
                    <div style={{ padding: '0' }}>{text}</div>
                  ), // 去除单元格内边距
            },
        ]
    }
]
const tabsBtnStyle = {
    width: '100%'
}

const tableColStyle = {
    whiteSpace: "nowrap"
}
const tabsStyle = {
    width: "98%"
}
const tipBtn = {
    marginRight: "25px"
}
const tableBtn = {
    float: "right",
    marginRight: "15px"
}
const sheetStyle = {
    theme: "TableStyleMedium2",
    showRowStripes: false,
    width: 200
}

const tabsTitleWidth = {
    width: "116px"
}
const colTitleStyle = {
    margin: "0 15px"
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
    // paddingRight: 24,
    padding:'0 15px'
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
    display:"flex", flexWrap:"nowrap"
}
const addColRowBtn = {
    col:{ backgroundColor: "#fafafa", width: "150px",height:"55px" },
    row:{ float: "left", backgroundColor: "#fafafa", width: "144px" }
}
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
        console.log("editing", editing);
        form.setFieldsValue({
            [dataIndex]: type === "date" ? moment(record[dataIndex]?record[dataIndex]:moment().year(), "YYYY") : record[dataIndex],
            // [dataIndex]:  record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();

            console.log("value", dataIndex, date);
            handleSave({
                ...record,
                ...values
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    const saveDate = () => {
        toggleEdit();
        let dateCur = {
            ...record
        }
        dateCur[dataIndex] = date?date:moment().year()
        console.log("dateDate", date);
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
                {type === "text" ? <TextArea ref={inputRef} onPressEnter={save} onBlur={save} maxLength={50} showCount/> : type === "date" ? <DatePicker clearIcon={null} onChange={(date, dateString) => { setDate(dateString) }} ref={inputRef} onPressEnter={saveDate} onBlur={saveDate} format={'YYYY'} picker="year" /> : <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />}
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
const TemplateEdit = () => {
    const [renameModalOpen, setRenameModalOpen] = useState({ visible: false, id: '', titleName: '', renameType: 'tab' })
    const [tabItem, setTabItem] = useState(tabsDataAll)
    const [activeTab, setActiveTab] = useState({ tipVisible: true, id: 0, tipStr: tabsDataAll[0].tableDescribe })
    const [explainModalOpen, setExplainModalOpen] = useState({ visible: false, id: 0, explain: '' })
    const [insertCol, setInsertCol] = useState({ insVisible: false, id: 0, direction: '' })
    const [addTabOpen, setAddTabOpen] = useState({ visible: false, newTabName: "" })
    const tableTabClick = (key) => {
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
    // tabs编辑方法
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            // addTabItem();
            // setRenameModalOpen({visible:true, })
            console.log(123123);
            setAddTabOpen({ ...addTabOpen, visible: true })
        }
    };
    const pagiNa = { position: ["none", "none"],pageSize:50 }
    const handleRename = (id, titleName, renameType) => {
        setRenameModalOpen({ visible: true, id: id, titleName: titleName, renameType: renameType })
    }
    const copyClick = (e, key) => {
        e.stopPropagation()
        let newTab = { ...tabItem[key], id: tabItem.length, tabName: tabItem[key].tabName + '(copy)' }
        setTabItem([...tabItem, newTab])
    }
    const addExplain = (id) => {
        setExplainModalOpen({ visible: true, id: id, explain: tabItem[activeTab.id].tableDescribe })
    }
    // 导出全部表
    const exportAllTable = () => {
        let workbook = new ExcelJS.Workbook();

        for (let index = 0; index < tabItem.length; index++) {
            let sheet = workbook.addWorksheet(tabItem[index].tabName, {
                views: [{ showGridLines: true }]
            })
            let columnArr = [];
            for (let i in tabItem[index].columns) {
                let tempObj = { name: "" };
                tempObj.name = tabItem[index].columns[i].title
                // console.log(columns[i].title);
                columnArr.push(tempObj)
            }
            sheet.addTable({
                name: tabItem[index].tabName,
                ref: "A1",
                headerRow: true,
                totalsRow: false,
                style: {
                    sheetStyle
                },

                columns: columnArr ? columnArr : [{ name: "" }],
                rows: tabItem[index].dataSource.map((item) => {

                    return [...tabItem[index].columns.map((colitem) => {
                        return colitem.dataIndex
                    })].map((titleitem) => {
                        return item[titleitem]
                    })
                })
            })

        }
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
            writeFile("会前任务", buffer)
        })
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
                sheetStyle
            },

            columns: columnArr ? columnArr : [{ name: "" }],
            rows: tabItem[key].dataSource.map((item) => {

                return [...tabItem[key].columns.map((colitem) => {
                    return colitem.dataIndex
                })].map((titleitem) => {
                    return item[titleitem]
                })
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
    const delSubtable = (e, key) => {
        e.stopPropagation()
        if (tabItem.length === 1) {
            message.warning('禁止删除')
        } else {
            // console.log("key",key);
            if (key === tabItem.length - 1) {
                setActiveTab({ ...activeTab, id: key - 1 })
            }

            let newTabItem = [...tabItem]
            newTabItem.splice(key, 1)
            newTabItem.forEach((item, index) => {
                item.id = index
            })
            console.log("tabitem.length", newTabItem);
            setTabItem(newTabItem)
            message.success('删除成功')
        }
    }
    const tabsTitleItem = (titleName, id) => {
        return <div key={id} style={tabsTitleWidth}>
            <Button type="text" style={tabsBtnStyle} onClick={() => handleRename(id, titleName, "tab")}>重命名</Button>
            <Button type="text" style={tabsBtnStyle} onClick={(e) => copyClick(e, id)}>复制子表</Button>
            {/* <Button type="text" style={tabsBtnStyle} onClick={setRule}>设置填表规则</Button> */}
            <Button type="text" style={tabsBtnStyle} onClick={() => addExplain(id)}>添加表说明</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => exportSubtable(titleName, id)}>导出子表</Button>
            <Button type="text" style={tabsBtnStyle} onClick={(e) => delSubtable(e, id)}>删除子表</Button>
        </div>
    }
    const handleTabsTitle = (titleName, id) => {
        return <div>
            <label style={colTitleStyle}>{titleName}</label>
            {activeTab.id === id && <Tooltip placement="bottomRight" title={(e) => tabsTitleItem(titleName, id)} color={'white'}>
                {tooltipIcon}
            </Tooltip>}
        </div>

    }
    const tipContent = (
        <div>
            <TextArea style={textAreaStyle} bordered={false} disabled maxLength={200} value={activeTab.tipStr} />
        </div>
    );


    const BtnText = () => {
        // let time = "2020-04-27T16:57:00"
        // if (moment().year() === moment(time).year()) {
        //     if (moment(time,"YYYY-MM-DD").isSame(moment(),'day')) {
        //         console.log("lasttime",moment(time).format("HH:mm"));
        //     }else{
        //         console.log("lasttime",moment(time).format("MM-DD"));
        //     }
        // }else{
        //     console.log("lasttime",moment(time).format("YYYY-MM-DD"));
        // }
        // console.log(moment().year())
        // console.log(moment(time).year());
        // setActiveTab({...activeTab, id:3})
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
            console.log(newTabItem[activeTab.id], renameModalOpen);
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
    const deleteCol = (id, colName) => {
        if (tabItem[activeTab.id].columns.length === 1) {
            message.warning("禁止删除")
            return
        }
        let newTabItem = [...tabItem]
        newTabItem[activeTab.id].columns.splice(id, 1)
        newTabItem[activeTab.id].dataSource.forEach((item) => {
            delete item[colName]
        })
        newTabItem[activeTab.id].columns.forEach((item, index) => {
            item.key = index
        });
        setTabItem(newTabItem)
    }
    const colInsert = (id, direction) => {
        console.log("insertId", id);
        setInsertCol({ insVisible: true, id: id, direction: direction })
    }
    const tableTitleItem = (colName, id) => {
        return <div key={id} style={tabsTitleWidth}>
            <Button type="text" style={tabsBtnStyle} onClick={() => handleRename(id, colName, "col")}>重命名列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "trans")}>列类型转换</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "left")}>向左插入列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "right")}>向右插入列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => deleteCol(id, colName)}>删除列</Button>
        </div>
    }
    const columnsHandle = (title, id) => {
        return <div key={id} style={tableColStyle}>
            <label> {title}</label>
            <Tooltip placement="bottomRight" title={() => tableTitleItem(title, id)} color={'white'} >
                {tooltipIcon}
            </Tooltip>
        </div>
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
        newData[activeTab.id].dataSource[row.key] = {
            ...row
        }
        setTabItem(newData)
    };
    const sorterTooltip = (sortOrder) => {
        if (sortOrder === 'ascend') {
            return '按升序排序';
        }
        if (sortOrder === 'descend') {
            return '按降序排序';
        }
        return '点击以排序';
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
        // if (values.colType === "date") {
        //     let currentDate = new Date()
        //     insertData = currentDate.getFullYear().toString();
        // }
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
    const sorterFunc = (type, item) => {
        let sorterfun
        switch (type) {
            case "text":
                sorterfun = (a, b) => parseInt(a[item.title]) - parseInt(b[item.title])
                break;
            case "number":
                sorterfun = (a, b) => a[item.title] - b[item.title]
                break;
            case "date":
                sorterfun = (a, b) => parseInt(a[item.title]) - parseInt(b[item.title])
                break;
            default:
                break;
        }
        return sorterfun
    }
    const tableEdit = (editType)=>{
        if (editType==="row") {
            let newData = [...tabItem]
            let rowProp = newData[activeTab.id].columns.map((item)=>{
                return {name: item.dataIndex, type:item.type}
            })
            let newRow = {
                key:tabItem[activeTab.id].dataSource.length
            }
            rowProp.forEach((item)=>{
                // item.type==="date"? newRow[item.name]=moment().year():newRow[item.name]=""
                newRow[item.name]=""
            })
            
            newData[activeTab.id].dataSource = [
                ...tabItem[activeTab.id].dataSource,
                newRow
            ]
            setTabItem(newData)
        }else{
            colInsert(tabItem[activeTab.id].columns.length-1, "right")
        }
    }
    return (
        <div>
            <div style={tableBtn}>
                <Button onClick={BtnText} style={tipBtn}>{shareIcon}</Button>
                <Button onClick={exportAllTable} style={tipBtn}>{importIcon}</Button>
                <Popover zIndex={900} placement="bottomRight" title={"页面填写说明："} content={tipContent} defaultOpen={activeTab.tipStr !== ""} open={activeTab.tipVisible && activeTab.tipStr !== ""} trigger="click" >
                    <Button onClick={() => setActiveTab({ ...activeTab, tipVisible: !activeTab.tipVisible })}>{tipIcon}</Button>
                </Popover>
            </div>

            <Tabs defaultActiveKey={0}
                onTabClick={(key) => { tableTabClick(key) }}
                activeKey={activeTab.id} type="editable-card" hideAdd={false} items={tabItem.map((item) => {
                    return {
                        label: handleTabsTitle(item.tabName, item.id),
                        key: item.id,
                        children: null,
                        closable: false
                    }
                })} style={tabsStyle} onEdit={onEdit} />
            <div style={tableBtnStyle}>
                <Table
                    key={activeTab.id}
                    className={"ant-table"}
                    components={components}
                    scroll={{ x: true }}
                    bordered
                    rowClassName={() => 'editable-row'}
                    dataSource={[...tabItem[activeTab.id].dataSource]}
                    columns={tabItem[activeTab.id].columns.map((item) => {
                        return {
                            ...item,
                            title:item.title==="#"?"#":columnsHandle(item.title, item.key),
                            sorter:  sorterFunc(item.type, item)
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
                <Button onClick={()=>tableEdit("col")} style={addColRowBtn.col}>+</Button>
            </div>

            <Button onClick={()=>tableEdit("row")} style={addColRowBtn.row}>+</Button>
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
export default TemplateEdit;