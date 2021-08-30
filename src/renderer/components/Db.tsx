import React, { useEffect, useState } from 'react';

export const Db = () => {
  const [databases, setDatabases] = useState<any[]>([]);

  useEffect(() => {
    (window as any).vm
      .exec('client.db().admin().listDatabases()')
      .then((res: any) => {
        setDatabases(res.databases);
      })
      .catch((err: any) => {
        console.error('[VMError]', err.message);
      });
  }, []);

  return (
    <div>
      <h1>MongoAdmin!</h1>
      {databases.map((db) => db.name)}
    </div>
  );
};
