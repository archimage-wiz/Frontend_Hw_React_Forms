import { useRef, useState } from "react";
import { SchedulerItem } from "./SchedulerItem/SchedulerItem";

type Training = {
    date: string;
    distance: number;
};

export function TrainingsCheduler() {
    const [trainings, setTrainings] = useState<Training[]>([
        { date: "2024-03-04", distance: 23 },
        { date: "2024-03-01", distance: 50 },
    ]);
    const currentDate = useRef<HTMLInputElement>(null);
    const currentKm = useRef<HTMLInputElement>(null);

    function processTrainings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const cDate: string | undefined = currentDate.current?.value;
        const cKm: number = Number(currentKm.current?.value);
        if (cDate !== undefined && cKm !== undefined) {
            setTrainings(updateTrainings(cDate, cKm));
        }
    }

    function updateTrainings(cDate: string, cKm: number)
    {
        const indexOfCdate = trainings.findIndex(
            (training) => training.date === cDate
        );
        if (indexOfCdate !== -1) {
            const newTrainings = [...trainings];
            newTrainings[indexOfCdate].distance += cKm;
            return newTrainings;
        } else {
            const newTrainings = [
                ...trainings,
                {
                    date: cDate,
                    distance: cKm,
                },
            ];
            newTrainings.sort((a, b) => (a.date > b.date ? 1 : -1));
            return newTrainings;
        }
    }

    function removeItem(date: string | undefined) {
        setTrainings(() => trainings.filter((training) => training.date !== date));
    }

    return (
        <>
            <form onSubmit={processTrainings}>
                <label>
                    Дата:
                    <input id="dateId" type="date" ref={currentDate} required />
                </label>
                <label>
                    Пройдено км:
                    <input type="number" ref={currentKm} required />
                </label>
                <input type="submit" value="OK" />
            </form>
            {trainings.map((training) => (
                <SchedulerItem
                    key={crypto.randomUUID()}
                    date={training.date}
                    distance={training.distance}
                    removeItem={removeItem}
                />
            ))}
        </>
    );
}
