import { Table } from "@navikt/ds-react";
import Menu from "../components/Menu";
import Spacer from "../components/Spacer";
import NavPanel from "../components/NavPanel";
import CenteredLoader from "../components/CenteredLoader";
import { format, getISOWeek, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Meldeperiode } from "../models/Meldeperiode";
import { useEffect, useState } from "react";

export default function Page() {

  const { t } = useTranslation();

  const [data, setData] = useState<Meldeperiode[] | null>(null);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/period/get')
      .then((res) => res.json())
      .then((data) => {
        const periods: Meldeperiode[] = data;
        setData(periods.map(period => ({
          meldeperiodeId: period.meldeperiodeId,
          fomDato: parseISO(period.fomDato + "T12:00:00"),
          tomDato: parseISO(period.tomDato + "T12:00:00"),
          frist: parseISO(period.frist + "T12:00:00")
        })))
        setLoading(false)
      }).catch((error) => {
      console.log(error)
    });
  }, [])

  const dataTable = data && <>
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
  </>;

  return (
    <main>
      <Menu />

      <h1>{t('indexTitle')}</h1>
      <p>{t('indexDescription')}</p>

      {isLoading && <CenteredLoader />}
      {!isLoading && dataTable}

    </main>
  );
}
