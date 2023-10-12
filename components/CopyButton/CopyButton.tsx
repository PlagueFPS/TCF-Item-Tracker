"use client"
import { useToastContext } from "@/contexts/ToastContext";
import { FaRegCopy } from "react-icons/fa6";

interface Props {
  className: string
  title: string
  link: string
}

export default function CopyButton({ className, title, link }: Props) {
  const { toast } = useToastContext()

  const onClickHandler = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${link}`)
    toast('Copied to Clipboard')
  }

  return (
    <FaRegCopy 
      className={ className }
      title={ title } 
      onClick={ onClickHandler }
    />
  )
}
