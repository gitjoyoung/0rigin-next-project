import {
  ROUTE_HELP,
  ROUTE_INQUIRY,
  ROUTE_INTRODUCE,
  ROUTE_SITE_MAP,
} from "@/constants/pathname";
import Link from "next/link";

const FOOTER_NAV = Object.freeze([
  { id: "introduce", name: "소개", link: ROUTE_INTRODUCE },
  { id: "inquiry", name: "1:1문의", link: ROUTE_INQUIRY },
  { id: "help", name: "도움말", link: ROUTE_HELP },
  { id: "sitemap", name: "사이트맵", link: ROUTE_SITE_MAP },
]);

const FOOTER_COPYRIGHT = {
  copyright: "Copyright © Origin Corp. All Rights Reserved.",
  contact: "Contact Us : admin@0rigin.com",
};
export default function Footer() {
  return (
    <div className="relative text-xs flex flex-col items-center justify-center gap-2 py-4 w-full border-t">
      <div className="flex flex-wrap font-semibold">
        {FOOTER_NAV.map(({ name, link, id }, index) => (
          <div key={id} className="flex items-center">
            {index > 0 && <span className="px-1 text-gray-400">|</span>}
            <Link href={link} className="px-1 hover:text-gray-900">
              {name}
            </Link>
          </div>
        ))}
      </div>
      <p>{FOOTER_COPYRIGHT.contact}</p>
      <p>{FOOTER_COPYRIGHT.copyright}</p>
    </div>
  );
}
