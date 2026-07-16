# 用户背景与学习起点

用户对深度学习基础和 Transformer 也不了解，需要先补充这些前置知识。
目标是在昇腾 NPU 上实现 Gated DeltaNet 算子。

教学路线规划（已更新）:

## 补充基础（第1-5课）
1. 神经网络基础（线性层、激活函数、归一化、残差）
2. 反向传播与梯度下降（链式法则、为什么 kernel 需要手写反向）
3. PyTorch 核心（Tensor、autograd、nn.Module、einsum、einops）
4. 自注意力机制（Q/K/V、softmax、因果掩码、KV Cache）
5. 多头注意力与 Transformer Block（完整 block 结构）

## GDN 主线（第6课起）
6. 线性注意力基础（从 softmax 注意力到线性注意力）
7. 关联记忆视角
8. 门控机制（GLA / Mamba2）
9. Delta 规则（DeltaNet）
10. Gated Delta 规则（GDN 核心）
11. 分块并行算法
12. Triton Kernel 实现解析
13. 昇腾 CANN 算子移植

语言偏好: 中文
