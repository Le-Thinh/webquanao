'use client'

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import  MenuItem  from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";

import { SafeUser } from "@/types";

interface UserMenuProps{
    currentUser:SafeUser|null;
}
const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
    const [isOpen,setIsOpen]=useState(false)

    const toggleOpen = useCallback(()=>{
        setIsOpen((prev)=>!prev);
    },[]);
    return ( 
        <>
        <div className="relative z-30">
        <div onClick={toggleOpen} className="p-2
        border-[1px]
        flex
        flex-row
        items-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-700"
        >
            <Avatar/>
            <AiFillCaretDown/>
        </div>
        {isOpen &&(
            <div className="absolute
            rounded-md
            shadow-md
            w-[170px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            flex
            flex-col
            cursor-pointer">
                {currentUser ?  <div>
                    <Link href="/orders">

                    <MenuItem onClick={toggleOpen}>Bạn đặt hàng</MenuItem>
                </Link>
                <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>Bảng của quản lý</MenuItem>

                    <MenuItem onClick={toggleOpen}>Đơn đặt hàng của bạn</MenuItem>
                </Link>
                <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>Trang quản trị viên</MenuItem>

                </Link>
                <hr/>
                <MenuItem onClick={()=>{
                    toggleOpen();
                    signOut()
                }} >Đăng xuất 
                </MenuItem>
                 </div> : <div>
                    <Link href="/login">
                    <MenuItem onClick={toggleOpen}>Đăng nhập</MenuItem>
                    </Link>
                    <Link href="/register">
                    <MenuItem onClick={toggleOpen}>Đăng ký</MenuItem>
                    </Link>
                </div>}
               
               
            </div>
        )}
    </div>
    {isOpen ? <BackDrop onClick={toggleOpen} />: null}
    </>)
    ;
};
 
export default UserMenu;