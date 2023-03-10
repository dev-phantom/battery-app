import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';


export default function Home() {
  const [batteryCharging, setBatteryCharging] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(0)
  useEffect(() => {
 navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", () => {
    updateChargeInfo();
  });
  function updateChargeInfo() {
    console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
    setBatteryCharging(battery.charging);
  }

  battery.addEventListener("levelchange", () => {
    updateLevelInfo();
  });
  function updateLevelInfo() {
     console.log(`Battery level: ${battery.level * 100}%`);
     setBatteryLevel(battery.level * 100);
  }

  battery.addEventListener("chargingtimechange", () => {
    updateChargingInfo();
  });
  function updateChargingInfo() {
    console.log(`Battery charging time: ${battery.chargingTime} seconds`);
  }

  battery.addEventListener("dischargingtimechange", () => {
    updateDischargingInfo();
  });
  function updateDischargingInfo() {
    console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
  }
});


  },[setBatteryLevel])
 

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-[#141414] w-full h-screen text-[#141414] flex flex-col justify-center items-center'>
        {batteryCharging == false ? <div className='pb-4 capitalize text-white'>try plugging your phone</div> : ""}
        <div className={`${
            batteryCharging == true ? 'animate-pulse ' : 'animate-none' }text-xl border-4 border-green-500  rounded-full w-[200px] h-[200px] des items-center flex justify-center`}>
            <div className={`${
            batteryCharging == true ? 'flex' : 'hidden' }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(74 222 128)" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            </div>
          <div className='animate-none text-white font-semibold text-2xl'>{batteryLevel}%</div>
        </div>
        <div
          className={`${
            batteryLevel <11 ? 'text-red-900' : 'text-white'
            } text-center  rounded-md px-2 py-2 text-lg pt-20 capitalize`}
          >{batteryLevel< 11 ? "please charge" : "created by phantom"}</div>
      </main>
    </>
  )
}
