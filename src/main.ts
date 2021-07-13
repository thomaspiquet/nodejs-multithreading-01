import { Worker } from 'worker_threads';

(() => {
  console.log(`[Main] Run in ${process.env.NODE_ENV} env`);

  // Instanciate worker
  const myWorker: Worker = new Worker(
    process.env.NODE_ENV === 'production' ? './myWorker.js' : './src/proxy.js',
  );

  // On worker online
  myWorker.on('online', () => {
    console.log(`[Main] Worker is online and executing code!`);
  });

  // On worker exit
  myWorker.on('exit', code => {
    console.log(`[Main] Worker execution is over with code: ${code}`);
  });

  // On worker error
  myWorker.on('error', error => {
    // Sometime stack is undefined, we can stringify error instead
    console.log(
      `[Main] Worker catch an error: ${error.stack || JSON.stringify(error)}`,
    );
  });
})();

