import { ReactComponent as InfoMark } from '../images/info_icon.svg';

export interface IAlertMessageProps {
  msg: string;
  danger: boolean;
}

export const AlertMessage = (props: IAlertMessageProps) => {
  const { msg, danger } = props;
  const color = danger ? 'red' : 'blue';

  return (
    <div
      className={`flex p-4 mb-4 text-lg text-${color}-700 bg-${color}-100 rounded-lg`}
      role="alert"
    >
      <InfoMark />
      <div>
        <span>{msg}</span>
      </div>
    </div>
  );
};
