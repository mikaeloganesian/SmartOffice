import Device from "../components/Device";

const DevicesPage = () => {
    return (
        <div className="grid mt-12 grid-cols-4 gap-5 p-5 mx-20">
            <Device size="m" value="24В" name="H12BN" imagePath={"https://static.tildacdn.com/tild3063-3966-4163-a534-663334376239/1.jpeg"} status="Напряжение" />
            <Device size="xl" value="24°" name="CD111" imagePath={"https://opt-instock.ru/assets/cache/webp/assets/products/11365/umnyj-zvonok-Xiaomi-Zero-Smart-Doorbell-1-200x200-0.jpg.webp"} status="Температура" />
            <Device size="m" value="67дБ°" name="750KK12" imagePath={"https://watchsport.ru/upload/iblock/3ca/3caff4b2e106cfeff77b3f4f9c456000.jpg"} status="Ур. шума" />

            <Device size="xxl" value="0.12 ррм°" name="F1531" imagePath={"https://xiaomi-smarthome.ru/wp-content/uploads/2017/10/Aqara-hub-1.jpg"} status="Ур. газа" />
            <Device size="m" value="752 мрс°" name="N-14-K" imagePath={"https://watchsport.ru/upload/iblock/006/006a3431c4e3e081acaa556888061eae.jpg"} status="Давление" />
            <Device size="m" value="12 м/с" name="LeiSK195" imagePath={"https://aqara.ru/wp-content/uploads/2021/07/1-%D0%BA%D0%BB-%D1%81-%D0%BD%D0%B5%D0%B9%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D1%8E.jpg"} status="Скор. ветра" />
            <Device value="12 м/с" name="LeiSK195" imagePath={"https://aqara.ru/wp-content/uploads/2021/07/1-%D0%BA%D0%BB-%D1%81-%D0%BD%D0%B5%D0%B9%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D1%8E.jpg"} status="Скор. ветра" />

        </div>
    );
}

export default DevicesPage