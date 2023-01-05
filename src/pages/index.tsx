import { Table } from "@navikt/ds-react";
import Menu from "../../components/Menu";
import Spacer from "../../components/Spacer";
import NavPanel from "../../components/NavPanel";
import { format, getISOWeek, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Meldeperiode } from "../../models/Meldeperiode";

type InitialState = {
  periods: Meldeperiode[];
}

export async function getServerSideProps() {
  let periods: Meldeperiode[] = [];

  // Get saved values
  try {
    const response = await fetch(process.env.DP_RAPP_API_URL + '/api/v1/meldeperiode/hente');
    if (response.ok) {
      periods = await response.json();
    }
  } catch (e) {
    // Couldn't load period list
  }

  // Data comes to page as props
  return {
    props: {
      periods
    },
  };
}

export default function Page(props: InitialState) {

  const { t } = useTranslation();

  const data = props.periods.map(period => ({
    meldeperiodeId: period.meldeperiodeId,
    fomDato: parseISO(period.fomDato + "T12:00:00"),
    tomDato: parseISO(period.tomDato + "T12:00:00"),
    frist: parseISO(period.frist + "T12:00:00")
  }));

  return (
    <main>
      <Menu />

      <h1>{t('indexTitle')}</h1>
      <p>{t('indexDescription')}</p>

      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">{t('period')}</Table.HeaderCell>
            <Table.HeaderCell scope="col">{t('date')}</Table.HeaderCell>
            <Table.HeaderCell scope="col">{t('deadline')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ fomDato, tomDato, frist }) => {
            return (
              <Table.Row key={fomDato.getTime()}>
                <Table.HeaderCell scope="row">
                  {t('week')} {getISOWeek(fomDato)} - {getISOWeek(tomDato)}
                </Table.HeaderCell>
                <Table.DataCell>
                  {format(fomDato, "dd.MM.yyyy")} - {format(tomDato, "dd.MM.yyyy")}
                </Table.DataCell>
                <Table.DataCell>
                  {format(frist, "dd.MM.yyyy")}
                </Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Spacer />

      <NavPanel nextHref="/form" nextText={t('startFillingOut')} />
    </main>
  );
}
