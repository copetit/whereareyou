import { ReactComponent as InfoMark } from '../images/info_icon.svg';

export interface IAlertMessageProps {
  msg: string;
  color: 'blue' | 'red';
}

export const AlertMessage = (props: IAlertMessageProps) => {
  const { msg, color } = props;

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
