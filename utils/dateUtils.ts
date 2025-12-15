import { addDays, parseISO } from 'date-fns';

interface DateRange {
    from: string;
    to: string;
};

export const splitDateRange = (from: string, to: string): DateRange[] => {
    const startDate = parseISO(from);
    const endDate = parseISO(to);
    const ranges: DateRange[] = [];

    let currentStart = startDate;

    while (currentStart <= endDate) {
        const chunkEnd = addDays(currentStart, 6);
        const rangeEnd = chunkEnd > endDate ? endDate : chunkEnd;

        ranges.push({
            from: currentStart.toISOString().replace(/T.*/, 'T00:00:00Z'),
            to: rangeEnd.toISOString().replace(/T.*/, 'T23:59:59Z'),
        });

        currentStart = addDays(rangeEnd, 1);
    }

    return ranges;
};