import { readTextFile } from "@/lib/utils";

interface TimeAndRecord {
  track_duration: number;
  record: number;
}

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _time_and_records = getTimeAndRecordsObjects(inputText);
  const _unified_times_and_records =
    getConcatenatedTimesAndRecords(_time_and_records);
  const _number_of_ways = [
    getNumberOfWaysToBreakARecord(_unified_times_and_records),
  ];

  const total = _number_of_ways.reduce((acc, act) => {
    return acc === 0 ? act : acc * act;
  }, 0);

  return total;
}

function getConcatenatedTimesAndRecords(t_and_r: TimeAndRecord[]) {
  return {
    record: Number(
      t_and_r
        .map((tr) => tr.record)
        .toString()
        .replaceAll(",", "")
    ),
    track_duration: Number(
      t_and_r
        .map((tr) => tr.track_duration)
        .toString()
        .replaceAll(",", "")
    ),
  };
}

function getTimeAndRecordsObjects(input: string[]) {
  const times = extractNumbers(input.at(0)!);
  const records = extractNumbers(input.at(1)!);

  function extractNumbers(s: string) {
    return s.split(":").at(-1)!.trim().split(" ").filter(Number);
  }

  return times.map((t, idx) => ({
    track_duration: Number(t),
    record: Number(records.at(idx)),
  }));
}

function getNumberOfWaysToBreakARecord(t_and_r: TimeAndRecord) {
  const _record_winnig_times = [];

  for (
    let _ms_holding_button = 0;
    _ms_holding_button <= t_and_r.track_duration;
    _ms_holding_button++
  ) {
    const _current_distance = getDistanceTraveled(
      _ms_holding_button,
      t_and_r.track_duration
    );

    if (_current_distance > t_and_r.record) {
      _record_winnig_times.push(_current_distance);
    }
  }

  return _record_winnig_times.length;
}

function getDistanceTraveled(
  button_pressed_duration: number,
  track_duration: number
) {
  return (track_duration - button_pressed_duration) * button_pressed_duration;
}

export { main };
