import React from 'react'

export default function ProductHeader() {
  return (
    <div className="m-3 mt-0 rounded-md border border-neutral-800 shadow bg-neutral-900">
        <div className="grid grid-flow-col">
          <div className="flex flex-col border-r border-neutral-700 my-2  justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Catalog
            </span>
            <span>Television</span>
          </div>
          <div className="flex flex-col border-r border-neutral-700 gap-1 my-2  justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Sub Catalog
            </span>
            <span>Q LED</span>
          </div>
          <div className="flex flex-col border-r border-neutral-700 gap-1 my-2 justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Brand Name
            </span>
            <span>LG</span>
          </div>
          <div className="flex flex-col border-r border-neutral-700 gap-1 my-2 justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Model Name
            </span>
            <span>Y1S Pro</span>
          </div>
          <div className="flex flex-col border-r border-neutral-700 gap-1 my-2 justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Device category
            </span>
            <span>Smart TV</span>
          </div>
          <div className="flex flex-col border-r border-neutral-700 gap-1 my-2 justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Manufacturer
            </span>
            <span>BBK Electronics</span>
          </div>
          <div className="flex flex-col border-r border-neutral-700 gap-1 my-2 justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Manufactured in
            </span>
            <span>China</span>
          </div>
          <div className="flex flex-col  relative  gap-1  p-2 pr-3 ml-4 pt-3 justify-center items-center">
            <span className="text-xs font-medium text-neutral-500">
              Product ata capability
            </span>
            <div className="w-full bg-neutral-600 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500"
                style={{ width: "80%" }}
              ></div>
            </div>
            <span>80%</span>
          </div>
        </div>
      </div>
  )
}
