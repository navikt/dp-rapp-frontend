import { Table } from "@navikt/ds-react";
import Menu from "../../components/Menu";
import Spacer from "../../components/Spacer";
import NavPanel from "../../components/NavPanel";
import { format, getISOWeek } from "date-fns";
import { useRouter } from "next/router";
import allTexts, { LocalesType } from "../allTexts";

export default function Page() {

  const router = useRouter();
  const texts = allTexts[(router.locale || router.defaultLocale) as keyof LocalesType];

  const data = [
    {
      startDate: new Date(2022, 10, 21, 12, 0),
      endDate: new Date(2022, 11, 4, 12, 0),
    },
    {
      startDate: new Date(2022, 11, 5, 12, 0),
      endDate: new Date(2022, 11, 18, 12, 0),
    },
    {
      startDate: new Date(2022, 11, 19, 12, 0),
      endDate: new Date(2023, 0, 1, 12, 0),
    }
  ];

  return (
    <main>
      <Menu />

      <h1>{texts.title}</h1>
      <p>Du kan sende inn meldekort for følgende perioder:</p>

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

      <NavPanel nextHref="/form" nextText="Begynn utfylling" />
    </main>
  );
}
