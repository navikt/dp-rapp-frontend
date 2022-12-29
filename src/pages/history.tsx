import { Table } from "@navikt/ds-react";
import { format, getISOWeek } from "date-fns";
import Spacer from "../../components/Spacer";
import Menu from "../../components/Menu";

export default function Page() {

  const data = [
    {
      startDate: new Date(2022, 9, 24, 12, 0),
      endDate: new Date(2022, 10, 6, 12, 0),
    },
    {
      startDate: new Date(2022, 10, 7, 12, 0),
      endDate: new Date(2022, 10, 20, 12, 0),
    }
  ];

  return (
    <main>
      <Menu />

      <h1>Tidligere meldekort</h1>

      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
            <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ startDate, endDate }) => {
            return (
              <Table.Row key={startDate.getTime()}>
                <Table.HeaderCell scope="row">
                  Uke {getISOWeek(startDate)} - {getISOWeek(endDate)}
                </Table.HeaderCell>
                <Table.DataCell>
                  {format(startDate, "dd.MM.yyyy")} - {format(endDate, "dd.MM.yyyy")}
                </Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Spacer />
    </main>
  );
}
