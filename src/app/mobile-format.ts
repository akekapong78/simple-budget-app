// โจทย์
// เปลี่ยนเลขมือถือที่เขียนติดกัน ให้เพิ่ม '-' ไปในแบบตัวอย่างนี้
// 0891234567 => 089-123-4567

// string => string
export function mobileFormat(mobileNo: string): string {
  // 3 ตัวแรก + -
  // ตัว 4-6 + -
  return mobileNo.slice(0, 3) + '-' + mobileNo.slice(3, 6) + '-' + mobileNo.slice(6)
  // fn slice คือ การตัดเอาข้อมูลมาเป็นช่วง ๆ
}
// console.log(mobileFormat('0807071657'))


// สั่ง Complile & Run
// > node_modules\.bin\tsc mobile-format.ts
// > node mobile-format.js
