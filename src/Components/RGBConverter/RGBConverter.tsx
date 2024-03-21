import { useState } from "react";
import "./RGBConverter.css";

export function RGBConverter() {
    const [color, setColor] = useState<string>("input");

    function hexToRGB(hex_value: string) {
        const hex = parseInt(hex_value.slice(1), 16);
        const r = (hex >> 16) & 0xff;
        const g = (hex >> 8) & 0xff;
        const b = hex & 0xff;
        return `rgb(${r}, ${g}, ${b})`;
    }
    function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
        const colorPattern = /^#[a-fA-F0-9]{6}$/;
        if (e.target.value.length >= 7) {
            if (colorPattern.test(e.target.value)) {
                setColor(() => e.target.value);
            } else {
                setColor(() => "error");
            }
            return;
        }
        setColor(() => "input");
    }

    return (
        <div className="RGBConverter" style={{ backgroundColor: color }}>
            <input
                type="text"
                className="input_color"
                placeholder="input color"
                onChange={handleChanges}
            ></input>
            <div className="chosen_color">
                {color === "input"
                    ? "Введите цвет"
                    : color === "error"
                    ? "Ошибка"
                    : hexToRGB(color)}
            </div>
        </div>
    );
}
