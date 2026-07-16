# Gated Delta Networks Resources

## Knowledge

- [Paper: "Gated Delta Networks: Improving Mamba2 with Delta Rule" — Yang, Kautz, Hatamizadeh (ICLR 2025)](https://arxiv.org/abs/2412.06464)
  核心论文。提出 gated delta rule，结合门控(Mamba2)和 delta rule(DeltaNet)，并设计分块并行训练算法。Use for: GDN 的核心公式、架构设计、实验结果。

- [Code: fla-org/flash-linear-attention — GDN ops](https://github.com/fla-org/flash-linear-attention/tree/main/fla/ops/gated_delta_rule)
  官方实现，包含 naive(参考实现)、chunk(分块并行)、fused_recurrent(推理) 三种模式。Use for: 理解 kernel 实现、移植参考。

- [Code: fla-org/flash-linear-attention — GDN layer](https://github.com/fla-org/flash-linear-attention/blob/main/fla/layers/gated_deltanet.py)
  GDN 层的 PyTorch 实现，包含投影、卷积、门控等组件。Use for: 理解完整层结构。

- [Paper: "Parallelizing Linear Transformers with the Delta Rule over Sequence Length" — Yang et al. (2024)](https://arxiv.org/abs/2406.06484)
  DeltaNet 论文，GDN 的直接前驱。Use for: 理解 delta rule 的分块并行算法基础。

- [Paper: "Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality" — Dao & Gu (2024)](https://arxiv.org/abs/2405.21060)
  Mamba2 论文，GDN 门控机制的来源。Use for: 理解 A_log / dt_bias 参数化、SSD 框架。

- [Paper: "Gated Linear Attention Transformers with Hardware-Efficient Training" — Yang et al. (2024)](https://arxiv.org/abs/2312.06635)
  GLA 论文，首次提出门控线性注意力的分块并行训练。Use for: 理解门控 + 分块并行的基本框架。

- [Paper: "Linear Transformers Are Secretly Fast Weight Programmers" — Schlangen et al. (2024)](https://arxiv.org/abs/2402.18850)
  将线性注意力统一为 fast weight programmer 视角，delta rule 对应 delta update。Use for: 理论直觉。

- [Blog: Qwen3-Next 技术博客 — GDN 集成](https://qwen.ai/blog?id=4074cca80393150c248e508aa62983f9cb7d27cd)
  GDN 被 Qwen3-Next 采用的工业实践。Use for: 了解 GDN 的实际部署效果。

## Wisdom (Communities)

- [flash-linear-attention Discord](https://discord.gg/vDaJTmKNcS)
  官方社区，作者 Songlin Yang 活跃。Use for: kernel 实现问题、训练技巧。

- [r/LocalLLaMA](https://reddit.com/r/LocalLLaMA)
  讨论线性注意力模型的开源社区。Use for: 模型对比、部署经验。

- [Ascend CANN 官方文档](https://www.hiascend.com/document)
  昇腾算子开发文档。Use for: CANN C++ API、AscendC 算子开发指南。

## Gaps
- 暂无 GDN 在 Ascend/NPU 上的公开实现——这正是本 mission 要填补的空白。
- 暂无 GDN kernel 的详细中文教程——本教学将创建。
