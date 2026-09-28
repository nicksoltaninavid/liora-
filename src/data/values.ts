import type { ComponentType } from "react";
import { TbLeaf, TbFlask, TbHeartHandshake, TbRecycle } from "react-icons/tb";

export interface Value {
  id: string;
  Icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export const values: Value[] = [
  {
    id: "natural",
    Icon: TbLeaf,
    title: "طبیعی و پاک",
    desc: "مواد اولیه‌ی باکیفیت با منشأ مشخص، بدون مواد مضر",
  },
  {
    id: "science",
    Icon: TbFlask,
    title: "علم‌محور",
    desc: "فرمولاسیون‌هایی که اثرشون با تحقیق ثابت شده",
  },
  {
    id: "care",
    Icon: TbHeartHandshake,
    title: "احترام به مشتری",
    desc: "پشتیبانی واقعی و شفافیت کامل درباره‌ی ترکیبات",
  },
  {
    id: "green",
    Icon: TbRecycle,
    title: "مسئولیت زیست‌محیطی",
    desc: "بسته‌بندی قابل بازیافت و تولید مسئولانه",
  },
];