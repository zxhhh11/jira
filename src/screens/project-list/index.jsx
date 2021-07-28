import * as qs from 'qs'

import React,{useEffect, useState} from "react"

import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject } from "../../util"

const apiUrl = process.env.REACT_APP_API_URL
console.log(apiUrl)
export const ProjectListScreen =()=>{
    const [param,setParam] = useState({name:'',personId:''})
    const [list,setList] = useState([])
    const [users,setUsers] = useState([])
    useEffect(()=>{
        console.log(cleanObject(param))
        // fetch 方法 获取数据
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response=>{
            console.log({response})
            if(response.ok){
                setList(await response.json())
            }
        })
    },[param])
    useEffect(()=>{
        // fetch 方法 获取数据
        fetch(`${apiUrl}/users`).then(async response=>{
            console.log({response})
            if(response.ok){
                setUsers(await response.json())
            }
        })
    },[])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
        <List users={users} list={list}></List>
    </div>
}