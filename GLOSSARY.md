# Gated Delta Networks 术语表

本术语表涵盖 Gated Delta Networks 及其前置概念的核心术语。术语在用户理解后才添加。

## 最基础

**神经元 (Neuron)**:
神经网络的最小单元。把若干输入加权求和、加偏置、再过激活函数：`y = 激活(Σ wᵢxᵢ + b)`。

**权重 (Weight / W)**:
神经元中可学习的参数，决定每个输入的重要性。训练就是不断更新权重。线性层 `y = Wx + b` 中 W 即权重矩阵。

**偏置 (Bias / b)**:
神经元中可学习的参数，提供基础平移，控制激活时机。

**损失函数 (Loss Function / L)**:
衡量网络预测与正确答案差距的标量。"学习" = 最小化损失。

**训练循环 (Training Loop)**:
反复执行的四个步骤：前向传播 → 算损失 → 反向传播(算梯度) → 更新参数(梯度下降)。

## 基础概念

**词嵌入 (Token Embedding)**:
一张可学习的查找表，把离散的 token ID 映射为连续向量，使网络能在向量上计算并学习语义。

**位置编码 (Positional Encoding)**:
给序列中每个位置附加的信号，因为注意力本身置换不变、不区分顺序。现代模型多用旋转位置编码 (RoPE)，GDN 也用 RoPE。

**注意力机制 (Attention)**:
一种让序列模型根据当前 token 的需求，动态地从其他 token 聚合信息的机制。标准 Transformer 使用 softmax 注意力。
_避免_: 注意力计算、attention

**Softmax 注意力 (Softmax Attention)**:
标准 Transformer 的注意力机制，计算 `softmax(QK^T/√d) V`，复杂度为 O(N²)，其中 N 为序列长度。

**线性注意力 (Linear Attention)**:
将 softmax 注意力中的 softmax 替换为可分解的特征映射 φ(·)，使得注意力可写为 `φ(q) · Σ φ(k)⊗v`，将复杂度从 O(N²) 降为 O(N)。
_避免_: 线性 transformer

## 记忆与状态

**关联记忆 (Associative Memory)**:
一种以矩阵 S 存储键值(key-value)关联的机制。写入: `S += v ⊗ k`，读取: `o = q S`。线性注意力的递归形式本质上是一个关联记忆。

**状态矩阵 (State Matrix)**:
线性注意力递归形式中的矩阵 S，累积了所有历史 token 的键值信息。维度为 [K, V]，其中 K 为 key 维度，V 为 value 维度。
_避免_: 隐藏状态、memory state

**内积 (Inner Product / Dot Product / ·)**:
两个等长向量对应位置相乘再求和，结果是一个标量。衡量两个向量有多"对齐"：方向一致最大，正交为零，相反为负。在线性注意力/DeltaNet 中用于"用 key 检索状态"——本质是算 key 和状态各行的相似度。
_避免_: 点乘（口语可用，正式用内积）

**外积 (Outer Product / ⊗)**:
两个向量的外积 `v ⊗ k` 产生一个矩阵，其中 (v⊗k)[i,j] = v[i] * k[j]。是关联记忆写入的基本操作。关键性质：结果只在"第二个向量的方向"上有值，可精准写入某个 key 对应的位置。

## 更新规则

**加法更新 (Additive Update)**:
最简单的记忆更新: `S_t = S_{t-1} + v_t ⊗ k_t`。只能累加，无法遗忘或修正。这是原始线性注意力使用的规则。

**门控 (Gating)**:
在记忆更新中引入遗忘门: `S_t = α_t · S_{t-1} + v_t ⊗ k_t`，其中 α_t ∈ (0,1) 控制对旧记忆的保留比例。GLA 和 Mamba2 使用此机制。

**Delta 规则 (Delta Rule)**:
一种精确的记忆修改规则: `S_t = S_{t-1} + (v_t - S_{t-1} k_t) ⊗ k_t`。先查询当前记忆中 k_t 对应的值，再用差值更新。类似梯度下降。DeltaNet 使用此规则。

**Gated Delta 规则 (Gated Delta Rule)**:
结合门控和 delta 规则: 先对状态施加门控衰减，再用 delta 规则做精确更新。GDN 的核心创新。

## 并行训练

**分块并行算法 (Chunk-wise Parallel Algorithm)**:
将序列分为大小为 C 的块，块内用矩阵乘法并行计算，块间用递归状态更新串行传递。使线性注意力能高效训练。

## 算子实现

**Triton Kernel**:
使用 Triton 语言编写的 GPU kernel，`fla` 库的核心实现方式。GDN 的 `chunk_gated_delta_rule` 即为 Triton kernel。

**Naive 实现 (Naive Implementation)**:
用纯 PyTorch 写的参考实现，逻辑清晰但速度慢。用于验证优化 kernel 的正确性。
