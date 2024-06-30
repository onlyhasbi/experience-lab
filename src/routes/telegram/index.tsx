import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

type TelegramResponse = {
  ok: boolean;
  result: number;
};

export const Route = createFileRoute('/telegram/')({
  loader: async () =>
    await axios
      .get<TelegramResponse>(
        `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/getChatMembersCount?chat_id=@react_idn`
      )
      .then((res) => res.data),
  component: () => <Telegram />
});

const Telegram = () => {
  const getTelegram = Route.useLoaderData();

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold">
        React.JS Telegram Group
        <br />
      </h2>
      <p>
        Total member :{' '}
        {new Intl.NumberFormat('id-ID', { currency: 'IDR' }).format(getTelegram.result)}
      </p>
    </div>
  );
};
