# Mission: 在昇腾(Ascend)上实现 Gated Delta Networks 算子

## Why
用户要在华为昇腾(Ascend)NPU上实现 Gated DeltaNet 的核心算子——将现有的 Triton GPU kernel 移植为 CANN C++ 算子。这需要深入理解 GDN 的数学原理、递归与分块并行算法、以及 kernel 实现细节，才能在昇腾硬件上高效实现。

## Success looks like
- 能用自己的话解释 gated delta rule 的数学公式及其与线性注意力、门控、delta rule 的关系
- 能画出 GDN 分块并行算法(chunk algorithm)的计算流程图
- 能读懂 `fla/ops/gated_delta_rule/` 下的 Triton kernel 代码
- 能在 Ascend C++ 中实现一个可工作的 GDN chunk kernel（前向+反向）
- 实现的算子通过与 PyTorch naive 实现的数值正确性验证

## Constraints
- 用户对线性注意力完全不了解，需要从基础概念开始
- 最终目标平台是 Ascend NPU (CANN)，不是 NVIDIA GPU
- 教学语言为中文

## Out of scope
- GDN-2 (Gated DeltaNet 2) 的变体——先掌握原始 GDN
- 训练完整 LLM——只关注算子实现
- 其他线性注意力模型(RWKV, RetNet等)的深入对比——只在需要理解 GDN 时简要提及
