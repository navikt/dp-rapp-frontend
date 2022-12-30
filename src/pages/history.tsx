import { Table } from "@navikt/ds-react";
import Menu from "../../components/Menu";
import Spacer from "../../components/Spacer";
import { format, getISOWeek } from "date-fns";
import { useTranslation } from "react-i18next";

export default function Page() {

  const { t } = useTranslation();

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

      <h1>{t('historyTitle')}</h1>

      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">{t('period')}</Table.HeaderCell>
            <Table.HeaderCell scope="col">{t('date')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ startDate, endDate }) => {
            return (
              <Table.Row key={startDate.getTime()}>
                <Table.HeaderCell scope="row">
                  {t('week')} {getISOWeek(startDate)} - {getISOWeek(endDate)}
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
