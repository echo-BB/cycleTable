import { useState, useEffect, useRef, useContext } from "react";
import React from 'react';
import moment from 'moment'
import { Table, Tabs, Tooltip, Button, Dropdown, Input, Modal, Popover, message, Checkbox, Alert, Form, InputNumber, DatePicker, Select } from "antd";
import { DownOutlined } from '@ant-design/icons';
import ExcelJS from "exceljs";
import './styles.css';
import _ from "lodash";
import QRCode from 'qrcode.react'
import { render } from "@testing-library/react";
const indexStyle = { width: "100%", display: "flex", alignItems: "center" }
// const tooltipIcon =<svg t="1683182809954" class="icon" viewBox="0 0 1079 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5396" width="18" height="18"><path d="M 503.074 573.449 a 51.6864 51.6864 0 0 0 73.3184 0 l 369.707 -370.492 a 52.224 52.224 0 0 0 0 -73.6597 a 51.6693 51.6693 0 0 0 -73.3184 0 L 539.716 463.07 L 206.652 129.297 a 51.6693 51.6693 0 0 0 -73.3184 0 a 52.2667 52.2667 0 0 0 0 73.6597 l 369.741 370.492 Z m 369.707 -122.871 L 539.716 784.341 L 206.652 450.577 a 51.6693 51.6693 0 0 0 -73.3184 0 a 52.2496 52.2496 0 0 0 0 73.6427 l 369.732 370.492 a 51.7035 51.7035 0 0 0 73.3184 0 l 369.741 -370.492 a 52.2581 52.2581 0 0 0 0 -73.6427 a 51.7035 51.7035 0 0 0 -73.344 0 Z" fill="#8a8a8a" p-id="5397"></path></svg>
// const tooltipIcon = <svg t="1681116195214" className="icon" viewBox="0 0 1024 1024" style={{ float: "right", margin: "auto 0", lineHeight: '2' }} version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3817" data-spm-anchor-id="a313x.7781069.0.i2" width="14" height="14"><path d="M548.352 730.624l394.24-360.96c21.504-19.456 23.04-53.248 3.072-74.24-19.456-21.504-53.248-23.04-74.24-3.072l-358.912 328.704L153.088 291.84c-21.504-19.456-54.784-17.92-74.24 3.584-19.456 21.504-17.92 54.784 3.584 74.24l394.752 360.448c1.024 0.512 1.536 1.536 2.56 2.048 19.456 16.896 49.152 16.384 68.608-1.536z" p-id="3818"></path></svg>
const tipIconBottom = <svg t="1685600725730" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2668" width="16" height="16"><path d="M513.9 753.8c-4.3 0-8.5-1.1-12.4-3.3L115.8 530.8c-12-6.8-16.2-22.1-9.3-34.1 6.8-12 22.1-16.2 34.1-9.3L513.8 700l369.6-212.6c12-6.9 27.3-2.8 34.1 9.2s2.8 27.3-9.2 34.1l-382 219.7c-3.8 2.3-8.1 3.4-12.4 3.4z" fill="#2c2c2c" p-id="2669"></path><path d="M513.9 539.2c-4.3 0-8.5-1.1-12.4-3.3L115.8 316.2c-12-6.8-16.2-22.1-9.3-34.1 6.8-12 22.1-16.2 34.1-9.3l373.3 212.6 369.6-212.6c12-6.9 27.3-2.8 34.1 9.2 6.9 12 2.8 27.3-9.2 34.1l-382 219.7c-3.9 2.2-8.2 3.4-12.5 3.4z" fill="#2c2c2c" p-id="2670"></path></svg>
const tipIconTop =  <svg t="1685600824739" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3309" width="16" height="16"><path d="M510.2 269.4c4.3 0 8.5 1.1 12.4 3.3l385.7 219.7c12 6.8 16.2 22.1 9.3 34.1-6.8 12-22.1 16.2-34.1 9.3L510.2 323.2 140.7 535.8c-12 6.9-27.3 2.8-34.1-9.2s-2.8-27.3 9.2-34.1l382-219.7c3.8-2.3 8.1-3.4 12.4-3.4z" fill="#2c2c2c" p-id="3310"></path><path d="M510.2 484c4.3 0 8.5 1.1 12.4 3.3L908.3 707c12 6.8 16.2 22.1 9.3 34.1-6.8 12-22.1 16.2-34.1 9.3L510.2 537.9 140.7 750.4c-12 6.9-27.3 2.8-34.1-9.2-6.9-12-2.8-27.3 9.2-34.1l382-219.7c3.8-2.2 8.1-3.4 12.4-3.4z" fill="#2c2c2c" p-id="3311"></path></svg>
const shareIcon = <svg t="1681442633310" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1719" width="20" height="20"><path d="M810.688 362.688c-40.64 0-77.376-16.32-104.32-42.688L453.824 457.792C458.752 475.136 462.208 493.056 462.208 512c0 18.944-3.52 36.864-8.448 54.208L706.368 704c26.944-26.304 63.68-42.688 104.32-42.688 82.496 0 149.312 66.88 149.312 149.312S893.12 960 810.688 960s-149.312-66.88-149.312-149.312c0-10.304 1.024-20.352 3.008-30.016l-252.352-137.664c-36.48 41.472-89.344 68.096-148.864 68.096C153.152 711.104 64 621.952 64 512s89.152-199.104 199.104-199.104c59.584 0 112.384 26.688 148.864 68.096l252.352-137.664c-1.984-9.728-3.008-19.712-3.008-30.016C661.312 130.88 728.192 64 810.688 64 893.12 64 960 130.88 960 213.312S893.12 362.688 810.688 362.688z" p-id="1720" fill="#8a8a8a"></path></svg>
const importIcon = <svg t="1681442852436" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2023" width="20" height="20"><path d="M877.614 743.251v218.749h-731.227v-218.861c0-30.205 23.399-54.673 52.254-54.673s52.254 24.468 52.254 54.729c0 0 0 0.056 0 0.056v109.346h522.264v-109.403c0-30.205 23.399-54.673 52.254-54.673s52.254 24.468 52.254 54.729c-0.056-0.056-0.056-0.056-0.056 0zM752.067 418.192c-10.181 10.688-26.718 10.688-36.955 0l-150.914-158.057v400.938c0 15.13-11.7 27.337-26.099 27.337h-52.198c-14.399 0-26.099-12.263-26.099-27.337v-400.938l-150.914 158.057c-10.181 10.688-26.718 10.688-36.955 0l-36.955-38.643c-10.181-10.688-10.181-28.012 0-38.699l258.574-270.835c10.181-10.688 26.718-10.688 36.899 0l258.517 270.835c10.181 10.688 10.181 28.012 0 38.699l-36.899 38.643z" p-id="2024" fill="#8a8a8a"></path></svg>
const saveIcon = <svg t="1683544468409" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4128" width="20" height="20"><path d="M919.466667 264.533333V832c0 46.933333-38.4 85.333333-85.333334 85.333333h-640c-46.933333 0-85.333333-38.4-85.333333-85.333333V192c0-46.933333 38.4-85.333333 85.333333-85.333333h567.466667c6.4 0 10.666667 2.133333 14.933333 6.4l136.533334 136.533333c4.266667 4.266667 6.4 8.533333 6.4 14.933333z" fill="#1890FF" p-id="4129"></path><path d="M322.133333 106.666667h384v213.333333h-384zM258.133333 640h512v277.333333h-512z" fill="#FFFFFF" p-id="4130"></path><path d="M599.466667 149.333333h64v128h-64zM364.8 725.333333h298.666667v21.333334h-298.666667zM364.8 810.666667h298.666667v21.333333h-298.666667z" fill="#69C0FF" p-id="4131"></path></svg>
const tooltipIconAction  = <svg t="1685957532916" className="icon" viewBox="0 0 1024 1024" style={{ float: "right", marginTop: "5px", marginLeft:"4px", lineHeight: '2' }} version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26563" width="14" height="14"><path d="M843.690667 324.266667l-298.666667 426.666666c-12.8 21.333333-38.4 25.6-59.733333 8.533334l-8.533334-8.533334-298.666666-426.666666c-12.8-21.333333-8.533333-46.933333 8.533333-59.733334 8.533333-4.266667 17.066667-8.533333 25.6-8.533333h597.333333c25.6 0 42.666667 17.066667 42.666667 42.666667 0 8.533333-4.266667 17.066667-8.533333 25.6z" fill="#000000" p-id="26564"></path></svg>
const tooltipIcon = <svg t="1685957532916" className="icon" viewBox="0 0 1024 1024" style={{ float: "right", marginTop: "5px", marginLeft:"4px", lineHeight: '2' }}  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26563" width="14" height="14"><path d="M843.690667 324.266667l-298.666667 426.666666c-12.8 21.333333-38.4 25.6-59.733333 8.533334l-8.533334-8.533334-298.666666-426.666666c-12.8-21.333333-8.533333-46.933333 8.533333-59.733334 8.533333-4.266667 17.066667-8.533333 25.6-8.533333h597.333333c25.6 0 42.666667 17.066667 42.666667 42.666667 0 8.533333-4.266667 17.066667-8.533333 25.6z" fill="#dbdbdb" p-id="26564"></path></svg>
const { TextArea } = Input;
// const tabsDataAll1 = [
//     [
//         [
//             { key: 0, 事件: '人地方工号吃吧v你吧', 原因: 'rter ghdfgh', 年份: 2023 },
//             { key: 1, 事件: '4  345   vbcncvb3sdfghdsfghdhdfghfgadfghdfdfgh cbv', 原因: 'bcvncvbncv bcvn ', 年份: 2023 },
//             { key: 2, 事件: 'dfgbnbvn ', 原因: 'ert tydu cbncvbn tryhj f', 年份: 2023 }
//         ], [
//             { key: 0, 对标程度: '体育i韩国进口吗把v你们v女', 对标维度: '想吃vbcvbxvbncv' },
//             { key: 1, 对标程度: '不vnmcvrtert的复古', 对标维度: '图一与金门刚回家' },
//             { key: 2, 对标程度: '在v 没和个没女女v吃 v不能', 对标维度: '地方工号吃不' }
//         ], [
//             { key: 0, 包含内容: '的发生地方', 客户名称: '111323' },
//             { key: 1, 包含内容: '史蒂夫持续a s', 客户名称: '312314' },
//             { key: 2, 包含内容: '梵蒂冈从v不能从v不能', 客户名称: '345工号发给好' },
//         ]
//     ], [
//         [
//             { key: 0, 事件: '儿童用吃个vncvbncvbdfg v不能', 原因: '让他拥抱你的风格', 年份: 2023 },
//             { key: 1, 事件: '饭Seth把v才能体验就你吃', 原因: '是的现场版v的风格结合吃bv n', 年份: 2023 },
//             { key: 2, 事件: '地方没吃女吧每日体育报女吗', 原因: '图UI体验vbncvbnvcbncvbdfghfgcvmnweertrdstycb', 年份: 2023 }
//         ], [
//             { key: 0, 对标程度: '太容易的风格才能', 对标维度: '他一人讨厌过年' },
//             { key: 1, 对标程度: '是的如果玩儿吧现场v', 对标维度: '过分的吃不vncvbnfg' },
//             { key: 2, 对标程度: '是的从v不能那么一图', 对标维度: '味儿语口译哦拍卖会' }
//         ], [
//             { key: 0, 包含内容: '从v下班让他', 客户名称: '风格和女女' },
//             { key: 1, 包含内容: '热土更方便呢从v不能', 客户名称: '热特发v不能呢的风格' },
//             { key: 2, 包含内容: '想吃v不回家吗女吧女', 客户名称: '饭个把女吃v吗v吃不腻' }
//         ]
//     ]
// ]
// const tabsDataAll = [
//     {
//         id: 0,
//         tabName: "与会人员",
//         tableDescribe: "",
//         tableRule: "",
//         dataSource: [
//             {
//                 key: 0,
//                 工号: "",
//                 姓名: "",
//                 性别: "",
//                 部门: "",
//                 职务描述: "",
//                 汇报对象: "",
//                 年龄: "",
//                 学历: "",
//                 司龄: "",
//                 联系方式: "",
//             },
//             {
//                 key: 1,
//                 工号: "",
//                 姓名: "",
//                 性别: "",
//                 部门: "",
//                 职务描述: "",
//                 汇报对象: "",
//                 年龄: "",
//                 学历: "",
//                 司龄: '',
//                 联系方式: "",
//             }, {
//                 key: 2,
//                 工号: "",
//                 姓名: "",
//                 性别: "",
//                 部门: "",
//                 职务描述: "",
//                 汇报对象: "",
//                 年龄: '',
//                 学历: "",
//                 司龄: '',
//                 联系方式: "",
//             }
//         ],
//         columns: [
//             {
//                 title: '工号',
//                 dataIndex: '工号',
//                 width: 144,
//                 key: 0,
//                 type: 'text',
//                 editable: true
//             },
//             {
//                 title: '姓名',
//                 dataIndex: '姓名',
//                 width: 90,
//                 key: 1,
//                 type: 'text',
//                 editable: true
//             },
//             {
//                 title: '性别',
//                 dataIndex: '性别',
//                 width: 90,
//                 key: 2,
//                 type: 'text',
//                 editable: true
//             },
//             {
//                 title: '部门',
//                 dataIndex: '部门',
//                 width: 144,
//                 key: 3,
//                 type: 'text',
//                 editable: true
//             },
//             {
//                 title: '职务描述',
//                 dataIndex: '职务描述',
//                 width: 144,
//                 key: 4,
//                 type: 'text',
//                 editable: true
//             },
//             {
//                 title: '汇报对象',
//                 dataIndex: '汇报对象',
//                 width: 144,
//                 key: 5,
//                 type: 'text',
//                 editable: true,

//             },
//             {
//                 title: '年龄',
//                 dataIndex: '年龄',
//                 width: 90,
//                 key: 6,
//                 type: 'number',
//                 editable: true,
//             },
//             {
//                 title: '学历',
//                 dataIndex: '学历',
//                 width: 90,
//                 key: 7,
//                 type: 'text',
//                 editable: true
//             },
//             {
//                 title: '司龄',
//                 dataIndex: '司龄',
//                 width: 90,
//                 key: 8,
//                 type: 'number',
//                 editable: true
//             },
//             {
//                 title: '联系方式',
//                 dataIndex: '联系方式',
//                 width: 127,
//                 key: 9,
//                 type: 'text',
//                 editable: true
//             }
//         ]
//     },
//     {
//         id: 1,
//         tabName: "访谈高管",
//         tableDescribe: "",
//         tableRule: "",
//         dataSource: [
//             {
//                 key: 0,
//                 部门: '',
//                 可访谈时间段: "",
//                 姓名: '',
//             },
//             {
//                 key: 1,
//                 部门: '',
//                 可访谈时间段: "",
//                 姓名: '',
//             },
//             {
//                 key: 2,
//                 部门: '',
//                 可访谈时间段: "",
//                 姓名: '',
//             },
//         ],
//         columns: [
//             {
//                 title: '姓名',
//                 dataIndex: '姓名',
//                 width: 90,
//                 key: 1,
//                 type: 'text',
//                 editable: true,

//             },
//             {
//                 title: '部门',
//                 dataIndex: '部门',
//                 width: 144,
//                 key: 2,
//                 type: 'text',
//                 editable: true,

//             },
//             {
//                 title: '可访谈时间段',
//                 dataIndex: '可访谈时间段',
//                 width: 156,
//                 key: 3,
//                 type: 'text',
//                 editable: true,
//             },
//         ]
//     }
// ]
const tabsDataAll = [
  {
    "id": 0,
    "columns": [
      {
        "key": 0,
        "type": "text",
        "title": "文字",
        "width": 300,
        "editable": true,
        "dataIndex": "文字"
      },{
        "key": 1,
        "type": "vote",
        "title": "哈哈哈哈",
        // "width": 300,
        "editable": true,
        "dataIndex": "哈哈哈哈",
        "voteNum":2
      }
    ],
    "tabName": "Table1",
    "tableRule": "",
    "dataSource": [
      {
        "key": 0,
        "文字": "",
        "哈哈哈哈":true
      },
      {
        "key": 1,
        "文字": "",
        "哈哈哈哈":false 
      },
      {
        "key": 2,
        "文字": "",
        "哈哈哈哈":true
      }
    ],
    "tableDescribe": ""
  }
]
const QRcodeStyle = { display: "flex", flexWrap: "nowrap", justifyContent: "space-between" }
const tabsBtnStyle = {
    width: '100%'
}
const submitBtn = { position: "absolute", right: "20px" }
const indexNumStyle = { margin: "auto" }
const tableColStyle = {
    whiteSpace: "nowrap"
}
const tabsStyle = {
    width: "95%",
}
const tipBtn = {
    marginRight: "25px"
}
const saveTipBtn = {
    marginRight: "25px",
    fontWeight: 400,
    backgroundColor:"#F59A22"
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
    height: "240px", width: "270px", color: "#1d2129"
}
const formStyle = {
    maxWidth: 600,
}
const formItemStyle = {
    margin: 0,
}
const tableDivStyle = {
    // paddingRight: 24,
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
    display: "flex", flexWrap: "nowrap",height:"90vh"
}
const addColRowBtn = {
    col: { backgroundColor: "#fafafa", width: "120px", height: "55px" },
    row: { float: "left", backgroundColor: "#fafafa", width: "144px" }
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
    handleVote,
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
        console.log("reocrd", record);
        try {
            const values = await form.validateFields();
            console.log("record,values", record, values);
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
        console.log("e:", e.target.checked);
        if (e.target.checked && handleVote(dataIndex)) {
            message.warn("超出可投票数量!")
            return
        }
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
        // console.log("chilren", children)
        childNode = editing ? (
            <Form.Item
                style={formItemStyle}
                name={dataIndex}
            >
                {type === "text" ? <TextArea ref={inputRef} onPressEnter={save} onBlur={save} maxLength={50} autoSize={textAreaRows} showCount /> : type === "date"
                    ? <DatePicker clearIcon={null} onChange={(date, dateString) => { setDate(dateString) }} placeholder="选择年份" ref={inputRef} onPressEnter={saveDate} onBlur={saveDate} format={'YYYY'} picker="year" />
                    : type === "vote" ? <Checkbox ref={inputRef} checked={form.getFieldValue(dataIndex)} style={{marginLeft:"30px"}} onChange={saveCheck}></Checkbox> : <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={tableDivStyle}
                onClick={toggleEdit}
            >
                {children[1] === '' ? '-':children[1] === true || children[1] === false?<Form.Item
                style={formItemStyle}
                name={dataIndex}
                initialValue={children[1]}
            ><Checkbox  checked={form.getFieldValue(dataIndex)} onChange={saveCheck} style={checkboxStyle} ></Checkbox> </Form.Item>: children}
            </div>
        );
        
    }
    return <td  {...restProps}>{childNode}</td>;
};
const TaskBeforeMeet = () => {
    const [renameModalOpen, setRenameModalOpen] = useState({ visible: false, id: '', titleName: '', renameType: 'tab' })
    const [tabItem, setTabItem] = useState(tabsDataAll)
    const [activeTab, setActiveTab] = useState({ tipVisible: true, id: 0, tipStr: tabsDataAll[0].tableDescribe })
    const [explainModalOpen, setExplainModalOpen] = useState({ visible: false, id: 0, explain: '' })
    const [insertCol, setInsertCol] = useState({ insVisible: false, id: 0, direction: '' })
    const [addTabOpen, setAddTabOpen] = useState({ visible: false, newTabName: "" })

    const [menuIcon, setMenuIcon] = useState(tooltipIcon)
    const [tableColIcon, setTableColIcon] = useState(tooltipIcon)

    const [addColType, setAddColType] = useState("")

    const [tipIcon, setTipIcon] = useState(tipIconBottom)

    const [shareModal, setShareModal] = useState(false)
    const shareUrl = "https://keyu.bantouyan.com/app/application/page-645a015319eaae3184b9a87a?branch=master&projectId=60"

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
            setAddTabOpen({ ...addTabOpen, visible: true })
        }
    };
    const pagiNa = { position: ["none", "none"], pageSize: 50 }
    const handleRename = (id, titleName, renameType) => {
        setRenameModalOpen({ visible: true, id: id, titleName: titleName, renameType: renameType })
    }
    const copyClick = (e, key) => {
        e.stopPropagation()
        // let newTabItem = Object.assign({}, tabItem[key])
        // let newTabItem = JSON.parse(JSON.stringify(tabItem[key]))
        let newTabItem = _.cloneDeep(tabItem[key])
        let newTab = { ...newTabItem, id: tabItem.length, tabName: tabItem[key].tabName + '(copy)' }
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
            // console.log("tabitem.length", newTabItem);
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
    const menuActive=(e)=>{
        if (e) {
            setMenuIcon(tooltipIconAction)
        }else{
            setMenuIcon(tooltipIcon)
        }
    }
    const handleTabsTitle = (titleName, id) => {
        return <div>
            <label style={colTitleStyle}>{titleName}</label>
            {activeTab.id === id && <Tooltip placement="bottomRight" onOpenChange={(e)=>menuActive(e)} title={(e) => tabsTitleItem(titleName, id)} color={'white'}>
                {menuIcon}
            </Tooltip>}
        </div>

    }
    const tipContent = (
        <div >
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
        // console.log(JSON.stringify(tabItem))
        // console.log(moment(time).year());
        // setActiveTab({...activeTab, id:3})
        setShareModal(true)
        console.log("123", tabsDataAll);
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
        console.log("insertId-e", id);
        // e.stopPropagation 
        setInsertCol({ insVisible: true, id: id, direction: direction })
    }
    const tableTitleItem = (colName, id) => {
        // console.log("123",e);
        return <div key={id} style={tabsTitleWidth}>
            <Button type="text" style={tabsBtnStyle} onClick={() => handleRename(id, colName, "col")}>重命名列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "trans",)}>列类型转换</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "left")}>向左插入列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => colInsert(id, "right")}>向右插入列</Button>
            <Button type="text" style={tabsBtnStyle} onClick={() => deleteCol(id, colName)}>删除列</Button>
        </div>
    }
    const tableColActive = (e)=>{
        console.log("e:",e);
        if(e){
            setTableColIcon(tooltipIconAction)
        }else{
            setTableColIcon(tooltipIcon)
        }
    }
    const columnsHandle = (title, id) => {
        // console.log("tatle", e);
        return <div key={id} style={tableColStyle}>
            <label> {title}</label>
            <Tooltip placement="bottomRight" onOpenChange={(e)=>tableColActive(e)} title={() => tableTitleItem(title, id)} color={'white'} >
                {tableColIcon}
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
        newData[activeTab.id].dataSource[row.key] = row
        setTabItem(newData)
    };
    const handleVote = (colName)=>{
        let curTable = tabItem[activeTab.id]
        let voteNum = curTable.columns.find((index)=>index.title===colName).voteNum
        let votedNum = curTable.dataSource.reduce((sum, item)=>{
            return item[colName]?sum+1:sum
        },0)
        console.log("voteNum:", votedNum);
        if (votedNum>=voteNum) {
            return true
        }else{
            return false
        }
    }
    //   转换类型后清空当前列
    const clearCol = (colName) => {
        let newData = [...tabItem]
        newData[activeTab.id].dataSource.forEach((item) => {
            item[colName] = ""
        })
        setTabItem(newData)
    }

    const onInsertFinish = (values) => {
        console.log("values", values)
        let newData = [...tabItem]
        let insertData = values.colType==='vote'?false:""

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
                newData[activeTab.id].columns.splice(insertCol.id, 0, { title: values.colName, dataIndex: values.colName, key: insertCol.id, type: values.colType, editable: true, voteNum:values.voteNum })
            } else if (insertCol.direction === "right") {
                newData[activeTab.id].columns.splice(insertCol.id + 1, 0, { title: values.colName, dataIndex: values.colName, key: insertCol.id, type: values.colType, editable: true, voteNum:values.voteNum })
            }

            for (let index = 0; index < newData[activeTab.id].columns.length; index++) {
                newData[activeTab.id].columns[index].key = index
            }

            newData[activeTab.id].dataSource.forEach((item) => {
                console.log("item:",item);
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
    const tableEdit = (editType) => {
        if (editType === "row") {
            let newData = [...tabItem]
            let rowProp = newData[activeTab.id].columns.map((item) => {
                return { name: item.dataIndex, type: item.type }
            })
            // console.log("rowProp:", rowProp);
            let newRow = {
                key: tabItem[activeTab.id].dataSource.length
            }
            rowProp.forEach((item) => {
                // item.type==="date"? newRow[item.name]=moment().year():newRow[item.name]=""
                if (item.type==='vote') {
                    newRow[item.name] = false
                }else{
                    newRow[item.name] = ""
                }
                // console.log("item:", item)
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
    const QrCodeGenerator = ({ data }) => {
        return (
            <div>
                <QRCode value={data} />
            </div>
        )
    }
    const clickCopy = () => {
        navigator.clipboard.writeText(shareUrl)
        message.success("复制成功")
    }
    const textClick = () => {
        // let newTabsItem = [...tabItem]
        // newTabsItem.forEach((item, index) => {
        //     item.columns.unshift({
        //         "type": "date",
        //         "editable": false,
        //         "dataIndex": "key",
        //         "title": "序号",
        //         "key": 0
        //     })
        //     item.columns.unshift({
        //         "type": "date",
        //         "editable": false,
        //         "dataIndex": "年份",
        //         "title": "填写人",
        //         "key": 0
        //     })
        //     let dataSource = []
        //     tabsDataAll1.forEach((attenItem) => {
        //         dataSource.push(...attenItem[index])
        //     })
        //     item.dataSource = dataSource
        // })
        // setTabItem(newTabsItem)
        // console.log("newTabsItem", JSON.stringify(tabItem))
        console.log("newTabsItem:", tabItem)
    }
    const saveTableValue = () => {
        console.log(tabItem[0].dataSource.length)
        for (let tabIndex = 0; tabIndex < tabItem.length; tabIndex++) {
            let element = tabItem[tabIndex].dataSource;
            // tabItem[tabIndex].dataSource
            for (let tableIndex = 0; tableIndex < element.length; tableIndex++) {
                const dataElement = element[tableIndex];
                // console.log(dataElement)
                for (const key in dataElement) {
                    if (dataElement[key] === "") {
                        message.warning(tabItem[tabIndex].tabName + "内存在未填写单元格")
                        return
                    }
                }
            }
        }
        
        for(let i = 0; i<tabItem[0].dataSource.length-1; i++){
            for(let j = i+1; j<tabItem[0].dataSource.length; j++){
                console.log('datasource',tabItem[0].dataSource[i], tabItem[0].dataSource[j])
                if(tabItem[0].dataSource[i]["工号"]===tabItem[0].dataSource[j]["工号"]){
                    message.warning("与会人员中存在相同工号，请修改后重新提交！")
                }
            }
        }

    }
    const delClick = (index) => {
        let newData = [...tabItem]
        newData[activeTab.id].dataSource.splice(index, 1);
        newData[activeTab.id].dataSource.forEach((item, index) => {
            item.key = index
        })

        setTabItem([...newData])
    }
    const showTipIcon = ()=>{
        return activeTab.tipVisible ? tipIconBottom:tipIconBottom
    }
    const tipIconClick = ()=>{
        // let newActiveTab = _.cloneDeep({...activeTab})
        // setActiveTab({...newActiveTab, tipVisible:!newActiveTab.tipVisible})
        setActiveTab({ ...activeTab, tipVisible: !activeTab.tipVisible })
        setTipIcon(activeTab.tipVisible?tipIconBottom:tipIconTop)
    }
    const delBtn = (index) => <Button onClick={() => delClick(index)} type="text">删除</Button>
    const addModalItemChange = (e)=>{
        console.log("e", e)
        setAddColType(e)
    }
    return (
        // style={{backgroundColor:"#F59A22"}}
        <div className="editTable" style={{height:"90vh"}}>
            <div style={tableBtn}>
                <Button style={saveTipBtn} onClick={textClick}>{saveIcon}</Button>
                <Button onClick={()=>handleVote("哈哈哈哈")} style={tipBtn}>{shareIcon}</Button>
                <Button onClick={exportAllTable} style={tipBtn}>{importIcon}</Button>
                
            </div>

                <div style={{display:"flex", flexWrap:"nowrap", width:"100%",justifyContent:"space-between"}}>
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
                {activeTab.tipStr !== ""&&<Popover zIndex={900} placement="bottomRight" title={"页面填写说明："} content={tipContent} defaultOpen={activeTab.tipStr !== ""} open={activeTab.tipVisible && activeTab.tipStr !== ""} trigger="click" >
                    <Button type="text"  onClick={() => tipIconClick()}>{tipIcon}</Button></Popover>}
                
                </div>

            <div style={tableBtnStyle} className="tableDiv">
                <Table
                    key={activeTab.id}
                    className={"ant-table"}
                    components={components}
                    // style={{width:"90%",height:"90%"}}
                    scroll={{ x: true  }}
                    bordered
                    rowClassName={() => 'editable-row'}
                    dataSource={[...tabItem[activeTab.id].dataSource]}
                    showSorterTooltip={false}
                    columns={[{
                        title: "#",
                        width:60
                        // key: 0,q
                        // render: (text, record, index) => {
                        //     return <Tooltip placement="right" color="#8a8a8a" title={()=>delBtn(index)}>
                        //     <Button type="text">{index+1}</Button>
                        //   </Tooltip>
                        // },
                    }, ...tabItem[activeTab.id].columns].map((item, index) => {
                        return {
                            ...item,
                            title: item.title === "#" || item.title === "序号" || item.title === "填写人" ? item.title : columnsHandle(item.title, item.key),
                            sorter: sorterFunc(item.type, item),
                            render: item.title === "序号" ? (_render) => {
                                return <label>{_render + 1}</label>
                            } : item.title === "#" ? (text, record, index) => {
                                return <Tooltip placement="right" color="#8a8a8a" title={() => delBtn(index)}>
                                    <Button type="text" style={{width:"100%"}}>{index + 1}</Button>
                                </Tooltip>
                            } : null
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
                                handleVote
                            }),
                        };
                    })}
                    pagination={pagiNa}
                />
                <Button onClick={() => tableEdit("col")} style={addColRowBtn.col}>+</Button>
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
                        <Select onChange={(e)=>addModalItemChange(e)}>
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
                    {addColType==="vote" && 
                    <Form.Item 
                        label="投票数量"
                        name="voteNum"
                        rules={[
                            {
                                required: true,
                                message: '输入可投票数量',
                            },
                        ]}>
                        <InputNumber></InputNumber>
                    </Form.Item>
                    }
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
            {/* 分享页面modal */}
            {shareModal ? <Modal zIndex={1000} open={shareModal} title="表单分发" onCancel={() => setShareModal(false)} onOk={() => clickCopy()} okText="点击复制链接" cancelText="取消">
                <div style={QRcodeStyle}>
                    <Button type="link" target="_blank" href={shareUrl}>点击链接访问</Button>
                    <QrCodeGenerator data={shareUrl} />
                </div>
            </Modal> : null}
            <Button style={submitBtn} type="primary" value="large" onClick={() => saveTableValue()}>提 交</Button>
        </div>
    )
}
export default TaskBeforeMeet;