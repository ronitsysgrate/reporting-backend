import { addDays, differenceInDays, parseISO } from 'date-fns';

interface DateRange {
    from: string;
    to: string;
};

export const splitDateRange = (from: string, to: string): DateRange[] => {
    const startDate = parseISO(from);
    const endDate = parseISO(to);
    const ranges: DateRange[] = [];

    const totalDays = differenceInDays(endDate, startDate);

    if (totalDays <= 28) {
        return [{ from, to }];
    }

    let currentStart = startDate;

    while (currentStart <= endDate) {
        const chunkEnd = addDays(currentStart, 27);
        const rangeEnd = chunkEnd > endDate ? endDate : chunkEnd;

        const rangeFrom = `${currentStart.toISOString().split('T')[0]}T00:00:00Z`;
        const rangeTo = chunkEnd > endDate
            ? to
            : `${chunkEnd.toISOString().split('T')[0]}T23:59:59Z`;

        ranges.push({
            from: rangeFrom,
            to: rangeTo
        });

        currentStart = addDays(rangeEnd, 1);
    }

    return ranges;
};