# 学习路线更新：需要补充深度学习和 Transformer 基础

用户表示对第二层（深度学习基础）和第三层（Transformer架构）也不了解。
因此调整教学路线，先创建5节补充课程（第1-5课），覆盖：
- 神经网络基础组件（线性层、SiLU、RMSNorm、残差连接）
- 反向传播与梯度下降（链式法则、矩阵运算梯度、为什么自定义kernel需要手写反向）
- PyTorch 核心（Tensor、autograd、nn.Module、einsum、einops）
- 自注意力机制（Q/K/V、softmax、因果掩码、KV Cache、O(N²)瓶颈）
- 多头注意力与 Transformer Block（完整 block 结构、GDN Block 对比）

完成补充后，从第6课开始进入 GDN 主线。
