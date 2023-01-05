import { Table } from "@navikt/ds-react";
import Menu from "../components/Menu";
import Spacer from "../components/Spacer";
import NavPanel from "../components/NavPanel";
import CenteredLoader from "../components/CenteredLoader";
import { Meldeperiode } from "../models/Meldeperiode";
import { LoadedMeldeperiode } from "../models/LoadedMeldeperiode";
import { format, getISOWeek } from "date-fns";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { fromStringToDate } from "../utils/date.utils";

export default function Page() {

  const { t } = useTranslation();

  const [data, setData] = useState<Meldeperiode[] | null>(null);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/periods')
      .then((res) => res.json())
      .then((periods) => {
        setData(periods.map((period: LoadedMeldeperiode) => ({
          meldeperiodeId: period.meldeperiodeId,
          fomDato: fromStringToDate(period.fomDato),
          tomDato: fromStringToDate(period.tomDato),
          frist: fromStringToDate(period.frist)
        })))
        setLoading(false)
      }).catch((error) => {
      console.log(error)
    });
  }, [])

  if (isLoading || data == null) {
    return (
      <main>
        <CenteredLoader />
      </main>
    );
  }

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
