# AndroidWorld

Lusor's run of the [AndroidWorld](https://github.com/google-research/android_world) benchmark on 9 November 2026: 116 tasks.

- [Results](https://lusor.ai/benchmarks/androidworld): the score on both graders, with time and cost.
- [All 116 tasks](https://lusor.ai/benchmarks/androidworld/tasks): each task's result, steps and video.
- [Raw data](https://data.lusor.ai/benchmarks/androidworld/2026-11-09/index.json): the run's setup and, for every task, `task.json`, `steps.json` and the video. [SHA256SUMS](https://data.lusor.ai/benchmarks/androidworld/2026-11-09/SHA256SUMS) lists a checksum for index.json and every task's task.json, steps.json, poster and video.
- [lusor-ai/androidworld](https://github.com/lusor-ai/androidworld): the method, per-task results and step data in one repository.
- [`skills`](skills): the six app skills written for AndroidWorld's test apps, which were in Lusor's skill catalog during the 9 November run. Published as benchmark evidence; Lusor's agent doesn't load them.

The score is from the Lusor Harness at the build in production on 9 November 2026, with DeepSeek V4.1 Flash (low effort) choosing its actions. The open-source release is a separate version and has not been benchmarked.
