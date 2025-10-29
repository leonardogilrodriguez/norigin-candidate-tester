import { CHANNELS_WIDTH, PIXELS_PER_MINUTE } from "./constants";
import { totalMinutesFromMidnight } from "./dates";

export const columnNow = (channels: Channel[], rowIndex: number = 0) => {
    const calculateMinutes = totalMinutesFromMidnight();
    return calculateNextColumn(calculateMinutes, channels, rowIndex);
}

const calculateNextColumn = (currentTime: number, channels: Channel[], currentRow: number) => {
    const firstColumn = channels[currentRow].schedules.findIndex((schedule) => ((schedule?.startMinutes ?? 0) <= currentTime && currentTime < (schedule?.endMinutes ?? 0)));
    const column = firstColumn !== -1 ? firstColumn : channels[currentRow].schedules.length - 1;
    return column;
}

export const spatialMove = ({ direction, activeRowIndex, activeColIndex, channels }: { direction: 'left' | 'right' | 'up' | 'down', activeRowIndex: number, activeColIndex: number, channels: Channel[] }) => {
    const newRow = activeRowIndex;
    let newCol = activeColIndex;

    if (direction === 'left') {
        if (newCol > 0) newCol--;
        //check if we must scroll left
        mustScrollLeft(channels, newRow, newCol);
    } else if (direction === 'right') {
        if (newCol < (channels[newRow]?.schedules.length ?? 0) - 1) newCol++;
    } else if (direction === 'up') {
        return colVerticalMovement('up', channels, activeRowIndex, activeColIndex);
    } else if (direction === 'down') {
        return colVerticalMovement('down', channels, activeRowIndex, activeColIndex);
    }

    return { newRow, newCol };
}

const colVerticalMovement = (direction: 'up' | 'down', channels: Channel[], activeRowIndex: number, activeColIndex: number) => {
    let newRow = activeRowIndex;
    let newCol = activeColIndex;

    const startPosition = channels[activeRowIndex].schedules[activeColIndex]?.startMinutes;
    const endPosition = channels[activeRowIndex].schedules[activeColIndex]?.endMinutes;
    const middlePoint = (startPosition ?? 0) + ((endPosition ?? 0) - (startPosition ?? 0)) / 2;
    if (direction === 'up') {
        if (newRow > 0) {
            newRow--;
            newCol = calculateNextColumn(middlePoint, channels, newRow);
        }
    } else if (direction === 'down') {
        if (newRow < channels.length - 1) {
            newRow++;
            newCol = calculateNextColumn(middlePoint, channels, newRow);
        }
    }

    return { newRow, newCol };
}

const mustScrollLeft = (channels: Channel[], newRow: number, newCol: number) => {
    const scrollElement = document.querySelector('main');
    if (scrollElement) {
        const { scrollLeft } = scrollElement;
        const firstPixelVisible = scrollLeft + CHANNELS_WIDTH;
        const targetColumn = channels[newRow]?.schedules[newCol];
        if (targetColumn) {
            const targetPosition = (targetColumn.startMinutes ?? 0) * PIXELS_PER_MINUTE
            if (targetPosition < firstPixelVisible) {
                scrollElement.scrollLeft = targetPosition;
            }
        }
    }
}
