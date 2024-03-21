import "./SchedulerItem.css";

type SchedulerProps = {
    date: string | undefined;
    distance: number;
    removeItem: (date: string | undefined) => void;
};

export function SchedulerItem(pops: SchedulerProps) {
    const { date, distance, removeItem } = pops;
    return (
        <>
            <div className="scheduler_item">
                <div>{date}</div>
                &gt;
                <div>{distance}</div>
                <div
                    onClick={() => removeItem(date)}
                    className="remove_item_button"
                >
                    (X)
                </div>
            </div>
        </>
    );
}
