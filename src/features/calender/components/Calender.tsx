import {
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Center,
} from '@chakra-ui/react';
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDay,
  startOfMonth,
} from 'date-fns';

const getCalendarArray = (date: Date) => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  return sundays.map((sunday) =>
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }),
  );
};

// TODO date-fnsのメソッドで曜日の配列を出せるやつを調査する
const weekArrayStartSunday = ['日', '月', '火', '水', '木', '金', '土'];

export function Calender() {
  const targetDate = new Date();
  const calender = getCalendarArray(targetDate);

  return (
    <Container maxW="container.xl">
      <Center>
        <Text fontSize="6xl">{format(targetDate, 'y年M月')}</Text>
      </Center>

      <TableContainer>
        <Table variant="striped" size="lg">
          <Thead>
            <Tr>
              {weekArrayStartSunday.map((day) => (
                <Th key={day}>{day}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {calender.map((weekRow, index) => (
              <Tr key={index}>
                {weekRow.map((date) => (
                  <Td key={getDay(date)}>{getDate(date)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
