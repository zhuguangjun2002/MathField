<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import ConditionNumberDemo from '../../demos/ConditionNumberDemo.vue'
</script>

<template>
  <ConceptPage slug="linear-system">
    <h2><span class="sec-no">壹</span>困境：消元法你早就会，可计算机为什么算出两个答案</h2>
    <p>
      解线性方程组 <MathInline tex="A\mathbf{x}=\mathbf{b}" />，你在
      <router-link to="/linear-algebra/elimination">线性代数第 1 讲</router-link>就学了高斯消元，
      手算能得出漂亮的分数精确解。可一旦把同一个方程组交给计算机、用有限精度的浮点去跑，怪事就来了——
      有时又快又准，有时却给出<strong>面目全非的答案</strong>，甚至只是把两行的顺序对调一下，结果就变了。
      科学计算里超过一半的机时都花在解 <MathInline tex="A\mathbf{x}=\mathbf{b}" /> 上，
      这个"看起来早就解决"的问题，恰恰是舍入误差最凶险的战场。
    </p>
    <p>
      麻烦有两种，长得像但根子完全不同。下面各摆一个能亲手复现的例子——两个都用 float64 实算，
      数字全部照抄运行结果。
    </p>
    <div class="story">
      <div class="story-title">📜 麻烦一（算法之罪）：一个 2×2 方程组，答案错了 100%</div>
      <p>解这个方程组，系数简单到可以口算：</p>
      <MathBlock tex="\begin{cases}10^{-17}x+y=1\\[2pt] x+y=2\end{cases}" />
      <p>
        两式相减得 <MathInline tex="(1-10^{-17})x=1" />，所以真解是
        <MathInline tex="x\approx1" />、<MathInline tex="y\approx1" />。现在老老实实按课本消元：
        拿第一行的主元 <MathInline tex="10^{-17}" /> 去消第二行，乘数
        <MathInline tex="f=1/10^{-17}=10^{17}" />。第二行变成
      </p>
      <MathBlock tex="(1-f\cdot10^{-17})\,x+(1-f)\,y=2-f\cdot 1" />
      <p>
        逐项看 float64 会算出什么。<MathInline tex="x" /> 的系数
        <MathInline tex="1-f\cdot10^{-17}=1-1=0" />，没问题。可另外两项<strong>出事了</strong>：
      </p>
      <MathBlock tex="1-10^{17}=-10^{17},\qquad 2-10^{17}=-10^{17}" />
      <p>
        <strong>两个式子的结果一模一样。</strong>float64 只有约 16 位十进制有效数字，
        而 <MathInline tex="10^{17}" /> 已经把小数点顶到了第 18 位——那个 1、那个 2
        <strong>连一个比特都没挤进去</strong>，被整个吞掉了。
        （这正是<router-link to="/numerical/float-error">第 1 讲</router-link>那件事：
        大数吃小数，加法把信息直接扔掉。）于是第二行成了
        <MathInline tex="-10^{17}y=-10^{17}" />，解出 <MathInline tex="y=1" />。
      </p>
      <p>
        <MathInline tex="y=1" /> 看着挺对——真值是 <MathInline tex="1-10^{-17}" />，误差只有
        <MathInline tex="10^{-17}" />，好得不能再好。可回代那一步是致命的：
      </p>
      <MathBlock tex="x=\frac{1-y}{10^{-17}}=\frac{1-1}{10^{-17}}=\frac{0}{10^{-17}}=0" />
      <p>
        <strong>算出 <MathInline tex="x=0" />，真值是 1，错了 100%。</strong>
        看清是怎么烂掉的：<MathInline tex="y" /> 那个 <MathInline tex="10^{-17}" /> 的<em>绝对</em>误差，
        被 <MathInline tex="1/10^{-17}=10^{17}" /> 这个除法<strong>整整放大了 17 个数量级</strong>，
        正好变成 <MathInline tex="x" /> 里大小为 1 的误差。
        <strong>小主元当除数，就是在给误差装一台放大器。</strong>
      </p>
      <p>
        而这个方程组本身<strong>一点毛病都没有</strong>：它的条件数（下面会定义）算出来是
        <strong>2.618</strong>，良态得很。同一个方程组，只要把两行<strong>对调一下</strong>再消元，
        算出的就是 <MathInline tex="x=1,\,y=1" />，分毫不差。<strong>这一锅是算法背的，问题是无辜的。</strong>
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 麻烦二（问题之罪）：换什么算法都救不回来</div>
      <p>
        第二种麻烦更深。有些方程组<strong>天生敏感</strong>：输入的系数只动了最后一位，
        真正的解就翻天覆地——注意是<strong>真解</strong>翻天覆地，不是算错。
        最著名的坏典型是<strong>希尔伯特矩阵</strong>
        <MathInline tex="H_{ij}=\dfrac{1}{i+j-1}" />，长这样：
      </p>
      <MathBlock tex="H_4=\begin{pmatrix}1&\frac12&\frac13&\frac14\\ \frac12&\frac13&\frac14&\frac15\\ \frac13&\frac14&\frac15&\frac16\\ \frac14&\frac15&\frac16&\frac17\end{pmatrix}" />
      <p>
        看着人畜无害，全是正数、对称、没有一个接近零。可它病入膏肓。实测一遍：取
        <MathInline tex="\mathbf{x}" /> 是<strong>全 1 向量</strong>（每个分量都是 1），
        算出 <MathInline tex="\mathbf{b}=H\mathbf{x}" />，再用<strong>带主元选取的</strong>高斯消元
        把 <MathInline tex="\mathbf{x}" /> 解回来。理想情况应该原样得回一串 1：
      </p>
      <div class="tbl-wrap">
        <table class="mini-tbl">
          <thead>
            <tr>
              <th>阶数 <MathInline tex="n" /></th>
              <th>条件数 <MathInline tex="\kappa_2" /></th>
              <th>解里偏离 1 最多的分量</th>
              <th>还剩几位对</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>3</td><td><MathInline tex="5.2\times10^{2}" /></td><td>1.00000000000001</td><td>14</td></tr>
            <tr><td>6</td><td><MathInline tex="1.5\times10^{7}" /></td><td>1.0000000005</td><td>9</td></tr>
            <tr><td>8</td><td><MathInline tex="1.5\times10^{10}" /></td><td>1.0000004</td><td>6</td></tr>
            <tr><td>10</td><td><MathInline tex="1.6\times10^{13}" /></td><td>1.0003</td><td>3</td></tr>
            <tr><td>12</td><td><MathInline tex="1.8\times10^{16}" /></td><td><b>0.644</b></td><td>0</td></tr>
            <tr><td>13</td><td>已测不准</td><td><b>−3.243</b></td><td>连符号都错</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        读这张表：<strong>阶数每加 2，正确位数就掉三位</strong>（9 → 6 → 3 → 0），而条件数每档涨约一千倍——
        两者步调完全一致。到 <MathInline tex="n=12" />，本该是 1 的分量算成了
        <strong>0.644</strong>；到 <MathInline tex="n=13" />，算出 <strong>−3.243</strong>，
        <strong>连正负号都不对</strong>，结果已是纯噪声。
      </p>
      <p>
        关键在于：这里用的<strong>已经是带主元选取的算法</strong>，麻烦一那种低级错误一个都没犯。
        输入唯一的瑕疵，是 <MathInline tex="1/3" />、<MathInline tex="1/7" />
        这些分数在二进制里存不下、被截到第 16 位的那点渣。
        <strong>这种病不怪算法，怪问题自己。</strong>换 Fortran、换超级计算机、换更聪明的消元顺序，
        全都救不回来——唯一的出路是<strong>提前知道它有病</strong>。
        要提前知道，就得能<strong>度量</strong>它。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：换个大主元，再给"敏感度"装上刻度</h2>
    <p>
      第一种麻烦好治，而且治法就写在病因里。既然祸根是"小主元当除数把误差放大
      <MathInline tex="1/|\text{主元}|" /> 倍"，那就<strong>别让小的当主元</strong>：每一步消元前，
      在这一列里挑<strong>绝对值最大的元</strong>换到主元位置。这叫
      <strong>部分主元选取（partial pivoting）</strong>。
    </p>
    <p>
      为什么"最大"就够了？因为换完之后，所有乘数
      <MathInline tex="f=a_{ik}/a_{kk}" /> 的绝对值都<strong>不超过 1</strong>——分子是这一列里的某个元，
      分母是这一列里最大的那个。乘数不超过 1，误差乘上它只会变小，传不开。
      上面那个 <MathInline tex="10^{-17}" /> 的例子，对调两行后乘数从
      <MathInline tex="10^{17}" /> 变成 <MathInline tex="10^{-17}" />，答案立刻就对了。
      这几乎是今天所有数值线性代数库（LAPACK、NumPy、MATLAB 的反斜杠）的默认做法。
    </p>
    <div class="insight">
      <div class="insight-title">💡 先搞懂"后向误差"：威尔金森换了个问法</div>
      <p>
        <strong>威尔金森</strong>在 1960 年代证明了：带部分主元的高斯消元，算出的解
        <MathInline tex="\hat{\mathbf{x}}" /> 恰好是<em>某个被微小扰动过的</em>方程组
        <MathInline tex="(A+\delta A)\hat{\mathbf{x}}=\mathbf{b}" /> 的<strong>精确解</strong>。
        这句话第一次读会觉得答非所问——我问算得准不准，你说它是<em>别的</em>方程组的精确解？
      </p>
      <p>
        <strong>先看画面。</strong>你把一台旧相机拍糊的照片交给修复程序，程序还你一张清晰的图。
        怎么判断它修得对？<strong>前向</strong>的问法是"这张图离原始场景差多远"——
        可你手上根本没有原始场景，无从比较。<strong>后向</strong>的问法是：
        "把程序还我的这张清晰图，重新按相机的模糊规律糊一遍，得到的东西和我交进去的那张糊图差多远？"
        这个能算，因为两张糊图都在手上。
      </p>
      <p>
        <strong>为什么值得换这个问法。</strong>前向误差 <MathInline tex="\|\hat{\mathbf{x}}-\mathbf{x}\|" />
        要知道真解才算得出，而真解正是你要求的东西——死循环。后向误差
        <MathInline tex="\|\delta A\|" /> 只需要把 <MathInline tex="\hat{\mathbf{x}}" /> 代回去看残差，
        <strong>随时可算</strong>。更要紧的是，它把两口锅<strong>分开</strong>了：
        后向误差衡量<strong>算法干净不干净</strong>，条件数衡量<strong>问题敏感不敏感</strong>，
        两者相乘才是你最终看到的前向误差：
      </p>
      <MathBlock tex="\underbrace{\text{解的相对误差}}_{\text{前向}}\;\lesssim\;\underbrace{\kappa(A)}_{\text{问题的病}}\times\underbrace{\text{后向误差}}_{\text{算法的锅}}" />
      <p>
        <strong>再看两个例子。</strong>①测量学里"平差"之后总要看残差，本质是同一件事：
        我拟合出的这条线，对应的是<em>哪一组</em>观测值，它离我真的量到的那组有多远。
        ②天气预报报错了，可以问"我这个预报，是<em>哪一组</em>初始场演化出来的"——
        若那组初始场和实测只差 0.01 ℃，那么模式没问题，是大气本身太敏感。
      </p>
      <p>
        <strong>最后一个反例，说明它不能单独用。</strong>后向误差小<strong>不等于</strong>答案对。
        上面希尔伯特那张表，用的正是后向稳定的算法，后向误差始终在
        <MathInline tex="10^{-16}" /> 量级——干净得无可挑剔，可 <MathInline tex="n=13" />
        的答案照样是垃圾。<strong>算法清白，问题有病，答案照烂。</strong>
        所以威尔金森那半只是故事的一半，另一半必须由条件数来补。
      </p>
    </div>
    <p>
      那就来定义这个"敏感度"。<strong>图灵 1948 年</strong>给出的答案叫<strong>条件数</strong>。
      但在写下公式之前，得先说清它用到的两样东西——<strong>范数</strong>与<strong>奇异值</strong>。
      这两个词后面会反复出现，值得当场讲透。
    </p>
    <div class="insight">
      <div class="insight-title">💡 一个矩阵能把误差放大多少：从"圆变椭圆"看起</div>
      <p>
        <strong>画面先行。</strong>把所有长度为 1 的向量画出来，就是一个<strong>单位圆</strong>。
        让矩阵 <MathInline tex="A" /> 作用上去，这个圆会被拉成一个<strong>椭圆</strong>
        （<router-link to="/linear-algebra/linear-map">线性映射讲</router-link>里"矩阵就是把空间均匀拉伸剪切"的那件事）。
        椭圆的<strong>长半轴</strong>就是 <MathInline tex="A" /> 能把向量拉到的最长，记作
        <MathInline tex="\sigma_{\max}" />；<strong>短半轴</strong>是最短，记作
        <MathInline tex="\sigma_{\min}" />。这两个数就叫 <MathInline tex="A" /> 的
        <strong>奇异值</strong>（最大和最小的那两个）。
      </p>
      <p>
        <strong>为什么值得发明它。</strong>一个 <MathInline tex="2\times2" /> 矩阵有四个数，
        <MathInline tex="1000\times1000" /> 的有一百万个。可要回答"它把误差放大多少"，
        <strong>只需要两个数</strong>：最能拉长的那个方向拉多少（<MathInline tex="\sigma_{\max}" />），
        最能压扁的那个方向压多少（<MathInline tex="\sigma_{\min}" />）。
        一百万个数被压缩成两个，还没丢掉要害——这就是奇异值的价值。
        顺带，<strong>矩阵范数</strong> <MathInline tex="\|A\|" /> 说的正是"最多能拉多长"，
        也就是 <MathInline tex="\sigma_{\max}" />；而 <strong>向量范数</strong>
        <MathInline tex="\|\mathbf{v}\|" /> 就是老老实实的长度
        <MathInline tex="\sqrt{v_1^2+\cdots+v_n^2}" />，没有别的意思。
      </p>
      <p>
        <strong>几个例子。</strong>①<MathInline tex="A=\begin{pmatrix}3&0\\0&3\end{pmatrix}" />：
        圆被放大成半径 3 的圆，长短半轴都是 3，两个方向一视同仁；
        ②<MathInline tex="A=\begin{pmatrix}100&0\\0&1\end{pmatrix}" />：
        圆被拉成一根横躺的细面条，长半轴 100、短半轴 1，扁得厉害；
        ③解 <MathInline tex="2\times2" /> 方程组 = 求两条直线的交点，两线<strong>近乎平行</strong>时，
        系数矩阵的两行几乎指着同一个方向，它把某个方向压得几乎为零——椭圆扁成一条线。
      </p>
      <p>
        <strong>一个反例，专治一个常见误解。</strong>很多人拿<strong>行列式</strong>判断病态：
        "det 接近 0 就危险"。可看
        <MathInline tex="A=\begin{pmatrix}100&0\\0&0.01\end{pmatrix}" />——
        <MathInline tex="\det A=1" />，标准得不能再标准，可长短半轴之比是
        <strong>10000</strong>，病得很重。<router-link to="/linear-algebra/determinant">行列式</router-link>量的是
        <strong>面积缩放</strong>（长半轴 × 短半轴，两者可以互相掩盖），
        而病态问的是<strong>两个半轴差多少倍</strong>。<strong>乘积和比值，是两回事。</strong>
      </p>
    </div>
    <p>
      有了这两个半轴，条件数就是<strong>椭圆的扁率</strong>：
      <MathInline tex="\kappa(A)=\sigma_{\max}/\sigma_{\min}=\|A\|\,\|A^{-1}\|" />。
      而它凭什么能当"误差放大倍数"，只要三行就能推出来。
    </p>
    <RevealBox title="三行推出误差放大不等式" label="对答案">
      <template #hint>
        动笔提示：从 <MathInline tex="A\mathbf{x}=\mathbf{b}" /> 和
        <MathInline tex="A(\mathbf{x}+\delta\mathbf{x})=\mathbf{b}+\delta\mathbf{b}" /> 两式相减开始，
        再想想 <MathInline tex="\|\mathbf{x}\|" /> 出现在分母上时，该用哪个方向的不等式去放缩它。
      </template>
      <p>
        <strong>第一步，把扰动单独拎出来。</strong>两式相减，
        <MathInline tex="\mathbf{b}" /> 消掉，剩下 <MathInline tex="A\,\delta\mathbf{x}=\delta\mathbf{b}" />，
        即 <MathInline tex="\delta\mathbf{x}=A^{-1}\delta\mathbf{b}" />。按"矩阵最多拉长
        <MathInline tex="\|A^{-1}\|" /> 倍"：
      </p>
      <MathBlock tex="\|\delta\mathbf{x}\|\;\le\;\|A^{-1}\|\,\|\delta\mathbf{b}\|" />
      <p>
        <strong>第二步，处理分母上的 <MathInline tex="\|\mathbf{x}\|" />。</strong>它在分母，
        要让不等号朝同一个方向，就得给它找个<em>下界</em>。由
        <MathInline tex="\mathbf{b}=A\mathbf{x}" /> 得 <MathInline tex="\|\mathbf{b}\|\le\|A\|\,\|\mathbf{x}\|" />，
        翻过来正是我们要的：
      </p>
      <MathBlock tex="\frac{1}{\|\mathbf{x}\|}\;\le\;\frac{\|A\|}{\|\mathbf{b}\|}" />
      <p><strong>第三步，两式相乘。</strong></p>
      <MathBlock tex="\frac{\|\delta\mathbf{x}\|}{\|\mathbf{x}\|}\;\le\;\|A\|\,\|A^{-1}\|\cdot\frac{\|\delta\mathbf{b}\|}{\|\mathbf{b}\|}=\kappa(A)\,\frac{\|\delta\mathbf{b}\|}{\|\mathbf{b}\|}" />
      <p>
        推完回头看，会发现<strong>条件数不是被定义出来的，是被推导逼出来的</strong>：
        <MathInline tex="\|A^{-1}\|" /> 来自第一步、<MathInline tex="\|A\|" /> 来自第二步，
        它们本来在两个不相干的地方，是最后一乘才凑成一对。
        图灵没有"想到"要把这两个范数乘起来，他是把不等式推到底，发现它们必然一起出现。
      </p>
      <p>
        <strong>顺带一件事：<MathInline tex="\kappa\ge1" /> 恒成立。</strong>因为
        <MathInline tex="\|A\|\,\|A^{-1}\|\ge\|AA^{-1}\|=\|I\|=1" />。
        也就是说<strong>没有任何矩阵能缩小相对误差</strong>，最好的情况是原样传过去
        （<MathInline tex="\kappa=1" />，圆映成圆）。这也解释了为什么
        <MathInline tex="\kappa" /> 这把尺子的零点在 1 而不是 0。
      </p>
      <p>
        最后提醒一句：这是<strong>最坏情况</strong>的上限。只有当 <MathInline tex="\mathbf{b}" />
        恰好落在最"软"的方向、扰动恰好落在最"硬"的方向时，等号才取到。
        所以动画里你会看到实际放大倍数总比 <MathInline tex="\kappa" /> 小一截——
        那不是算错了，是你没拖到最坏的那个方向。
      </p>
    </RevealBox>

    <h2><span class="sec-no">叁</span>亲手把方程组从良态拧成病态</h2>
    <p>
      两条直线的交点就是一个 <MathInline tex="2\times2" /> 方程组的解。下面这个动画有两个旋钮：
      <strong>斜率差 d</strong>（控制两线夹角，也就是问题的病情）和<strong>扰动 δ</strong>
      （给第二个方程一点测量误差）。要盯的是读数区第二行——它把上面那条不等式的三个量
      （数据的相对变化、解的相对变化、两者之比）当场算给你，再和 <MathInline tex="\kappa" /> 对一眼。
      有个反直觉的小实验别错过：<strong>固定 d 只拖 δ，放大倍数一动不动</strong>。
    </p>
    <ConditionNumberDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 条件数与误差放大不等式</div>
      <p>
        取一种向量范数 <MathInline tex="\|\cdot\|" />，再用它<strong>诱导</strong>出矩阵范数：
      </p>
      <MathBlock tex="\|A\|=\max_{\mathbf{x}\ne0}\frac{\|A\mathbf{x}\|}{\|\mathbf{x}\|}" />
      <p>
        这个定义要逐词读。<MathInline tex="\|A\mathbf{x}\|/\|\mathbf{x}\|" /> 是
        "<MathInline tex="A" /> 把这一个向量拉长了几倍"，
        <MathInline tex="\max" /> 是"在所有方向里挑最狠的那个"——所以
        <MathInline tex="\|A\|" /> 的意思就是<strong>最大拉伸倍数</strong>，正是上一节那个长半轴
        <MathInline tex="\sigma_{\max}" />。"诱导"二字则说明：矩阵范数<strong>不是另起炉灶</strong>，
        它是被你先选的那把量向量的尺子唯一决定的。
      </p>
      <p>非奇异矩阵 <MathInline tex="A" /> 的<strong>条件数</strong>定义为</p>
      <MathBlock tex="\kappa(A)=\|A\|\,\|A^{-1}\| \;\ge\; 1" />
      <p>
        对 2-范数（即普通的欧氏长度），它等于<strong>最大奇异值与最小奇异值之比</strong>
        <MathInline tex="\kappa_2(A)=\sigma_{\max}/\sigma_{\min}" />，也就是那个椭圆的扁率。
        若 <MathInline tex="A\mathbf{x}=\mathbf{b}" />，数据扰动
        <MathInline tex="\mathbf{b}\to\mathbf{b}+\delta\mathbf{b}" /> 引起解扰动
        <MathInline tex="\delta\mathbf{x}" />，则
      </p>
      <MathBlock tex="\frac{\|\delta\mathbf{x}\|}{\|\mathbf{x}\|} \;\le\; \kappa(A)\,\frac{\|\delta\mathbf{b}\|}{\|\mathbf{b}\|}" />
      <p>
        <MathInline tex="\kappa\approx1" /> 为<strong>良态</strong>；<MathInline tex="\kappa" />
        很大为<strong>病态</strong>。一条好用的粗估：<strong>float64 有约 16 位有效数字，
        <MathInline tex="\kappa\approx10^{k}" /> 就吃掉大约 <MathInline tex="k" /> 位，
        剩下 <MathInline tex="16-k" /> 位可信</strong>。回头核对第壹节那张希尔伯特表：
        <MathInline tex="n=10" /> 时 <MathInline tex="\kappa\approx10^{13}" />，
        <MathInline tex="16-13=3" /> 位——表上写的正是"还剩 3 位对"。
        <MathInline tex="n=12" /> 时 <MathInline tex="\kappa\approx10^{16}" />，
        剩 0 位，表上正是 0。<strong>这条粗估在整张表上逐行兑现。</strong>
      </p>
      <p>
        当 <MathInline tex="\det A\to0" />（矩阵趋于奇异）时 <MathInline tex="\sigma_{\min}\to0" />，
        <MathInline tex="\kappa\to\infty" />——这与<router-link to="/linear-algebra/determinant">行列式讲</router-link>的
        "det = 0 即压扁成奇异"接上了：<strong>病态就是"离奇异有多近"</strong>。
        但请记住第贰节那个反例：<strong>反过来不成立</strong>，det 不小也可能病得很重
        （<MathInline tex="\mathrm{diag}(100,\,0.01)" /> 的 det 是 1，
        <MathInline tex="\kappa" /> 是 10000）。判病态要看比值，不能看乘积。
      </p>
    </div>

    <h2><span class="sec-no">伍</span>买到了什么：一副诊断眼光，和整个科学计算的底座</h2>
    <div class="story">
      <div class="story-title">🛰️ 手机导航为什么在高楼间乱飘：条件数就写在天上</div>
      <p>
        <strong>先说画面。</strong>你在开阔的郊外开车，导航的蓝点稳稳贴着路面。
        一进市中心的高楼峡谷，蓝点开始发神经：横跳到隔壁街、在两条平行马路之间来回犹豫，
        有时甚至标出你在楼里面。手机没坏，卫星也没坏，测距精度和郊外时一模一样。
        <strong>变的只是卫星在天上的几何位置。</strong>
      </p>
      <p>
        <strong>为什么这是一道线性方程组题。</strong>GPS 定位的原理是<strong>三边测量</strong>：
        每颗卫星报出"我到你的距离是多少"，你的位置就在以它为球心的一个球面上；
        几个球面一交，交点就是你。把这些球面方程在一个粗略猜测点附近线性化，
        得到的正是 <MathInline tex="A\,\delta\mathbf{p}=\delta\boldsymbol{\rho}" />：
        右端 <MathInline tex="\delta\boldsymbol{\rho}" /> 是各颗卫星的测距残差，
        左端 <MathInline tex="\delta\mathbf{p}" /> 是你的位置修正量，而
        <strong>矩阵 <MathInline tex="A" /> 的每一行，就是从你指向那颗卫星的单位方向向量</strong>。
        矩阵长什么样，完全由<strong>卫星在天上怎么分布</strong>决定。
      </p>
      <p>
        <strong>动手算。</strong>简化到平面上两颗卫星，方向夹角 <MathInline tex="\theta" />，于是
      </p>
      <MathBlock tex="A=\begin{pmatrix}1&0\\ \cos\theta&\sin\theta\end{pmatrix},\qquad \kappa_2(A)=\cot\frac{\theta}{2}\ \ (\theta\ \text{较小时}\approx 2/\theta)" />
      <p>
        代进去实算（最后一列是"测距误差被放大成位置误差的倍数"，
        GPS 工程里管这个量叫 <strong>DOP，精度衰减因子</strong>）：
      </p>
      <div class="tbl-wrap">
        <table class="mini-tbl">
          <thead>
            <tr>
              <th>两星夹角</th>
              <th><MathInline tex="\kappa_2(A)" /></th>
              <th>DOP</th>
              <th>测距误差 2 m 时的定位误差</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>90°</td><td>1.00</td><td>1.41</td><td>约 2.8 m</td></tr>
            <tr><td>45°</td><td>2.41</td><td>2.00</td><td>约 4.0 m</td></tr>
            <tr><td>10°</td><td>11.4</td><td>8.14</td><td>约 16 m</td></tr>
            <tr><td>2°</td><td>57.3</td><td>40.5</td><td><b>约 81 m</b></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>读出物理。</strong>卫星在天上四散张开时，<MathInline tex="\kappa\approx1" />，
        测距误差原样变成定位误差，几米——这就是郊外那个稳稳的蓝点。
        可高楼把大半个天空挡住了，能收到的几颗卫星全挤在头顶那条窄缝里，夹角只剩十来度，
        <MathInline tex="\kappa" /> 涨到十几，同样的测距误差被放大成<strong>十几米到几十米</strong>——
        正好是一条马路的宽度。<strong>蓝点跳到隔壁街，不是手机算错了，是天上的几何病了。</strong>
        所以 GPS 接收机除了报坐标，还会报一个 DOP 值；工程上通常认为 DOP 小于 2 才算好定位，
        超过 6 的解就该打问号——那其实就是在报"本次解算的条件数是多少"。
      </p>
      <p>
        <strong>条件不成立会怎样。</strong>把夹角推到 0：两颗卫星在同一个方向上，
        <MathInline tex="A" /> 的两行完全一样，<MathInline tex="\sigma_{\min}=0" />，
        <MathInline tex="\kappa=\infty" />，方程组<strong>无解</strong>（准确说是解不唯一）。
        物理上也说得通：两颗同向的卫星给的是<em>同一条</em>信息，你沿着垂直于它的方向随便挪，
        两个测距值都不变，观测根本区分不出来。<strong>这时候缺的不是算力，是信息</strong>——
        唯一的办法是等一颗别的方向的卫星升起来，或者换个能看见更多天空的位置。
        你在隧道口把手机举向窗外那一下，干的正是这件事。
      </p>
    </div>
    <div class="insight">
      <div class="insight-title">💊 还上第 3 讲那笔债：岭回归那一项，数值上是在退烧</div>
      <p>
        <router-link to="/numerical/interpolation">第 3 讲</router-link>讲龙格现象时说过，
        机器学习治过拟合靠<strong>正则化</strong>——在目标里加一项
        <MathInline tex="\lambda\|\boldsymbol\beta\|^2" /> 惩罚系数的大小，并许诺
        "它在数值上还有第二重作用，第 5 讲会看到"。现在兑现。
      </p>
      <p>
        最小二乘要解的是<strong>法方程</strong>
        <MathInline tex="X^{\top}X\boldsymbol\beta=X^{\top}\mathbf{y}" />。麻烦在于
        <MathInline tex="X^{\top}X" /> 的奇异值是 <MathInline tex="X" /> 的<strong>平方</strong>
        （<MathInline tex="\sigma_i(X^\top X)=\sigma_i(X)^2" />），所以
      </p>
      <MathBlock tex="\kappa(X^{\top}X)=\kappa(X)^2" />
      <p>
        <strong>条件数被平方了。</strong>取一组两列几乎共线的数据实算：
        <MathInline tex="\kappa(X)=1.80\times10^{2}" />，而
        <MathInline tex="\kappa(X^{\top}X)=3.23\times10^{4}" />——正好是前者的平方。
        本来还能忍的病，一过法方程就成了重症。这也正是数值线性代数<strong>宁可用 QR 或 SVD
        直接分解 <MathInline tex="X" />、也不去碰 <MathInline tex="X^{\top}X" /></strong> 的原因。
      </p>
      <p>
        而岭回归解的是 <MathInline tex="(X^{\top}X+\lambda I)\boldsymbol\beta=X^{\top}\mathbf{y}" />。
        加上 <MathInline tex="\lambda I" /> 意味着<strong>每个奇异值都被抬高</strong>
        <MathInline tex="\lambda" />：大的几乎没感觉，小的却被从地板上拽起来——
        而条件数正是被那个最小的拖垮的。同一组数据，逐档实测：
      </p>
      <div class="tbl-wrap">
        <table class="mini-tbl">
          <thead>
            <tr><th><MathInline tex="\lambda" /></th><th>0</th><th><MathInline tex="10^{-4}" /></th><th><MathInline tex="10^{-2}" /></th><th><MathInline tex="10^{-1}" /></th><th>1</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><MathInline tex="\kappa(X^{\top}X+\lambda I)" /></td>
              <td><MathInline tex="3.2\times10^{4}" /></td>
              <td><MathInline tex="2.3\times10^{4}" /></td>
              <td>786</td><td>81</td><td><b>9.0</b></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <MathInline tex="\lambda" /> 从 0 加到 1，条件数从三万多掉到 <strong>9</strong>——
        <strong>病态被退烧了三个多数量级</strong>。所以那个正则化系数是在做两件事：
        统计上压住过拟合（第 3 讲说的），数值上压低条件数（这一讲说的）。
        它们不是巧合地凑在一起：<strong>系数被逼得又大又互相抵消，正是"几乎共线"在统计侧的样子</strong>，
        而几乎共线在数值侧的名字就叫病态。<strong>同一个病，两门课各起了一个名字。</strong>
        代价当然也有：<MathInline tex="\lambda" /> 越大，解偏离真正的最小二乘解越远——
        你调的每一个正则化系数，都是在"稳"和"准"之间挑一个点。
      </p>
    </div>
    <p>这副眼光装上之后，还能看清这些事：</p>
    <ul>
      <li>
        <strong>一切都归结为解 Ax=b</strong>：结构受力、电路网络、流体仿真、经济模型，
        离散化到最后都是一个（往往巨大的）线性方程组。它是科学计算当之无愧的核心，
        而条件数决定了你能不能<strong>信任</strong>算出来的解；
      </li>
      <li>
        <strong>大而稀疏就换迭代法</strong>：几百万未知数时，直接消元的
        <MathInline tex="O(n^3)" /> 代价吃不消，改用<strong>雅可比 / 高斯-赛德尔 / 共轭梯度</strong>
        等迭代法反复逼近。它们收敛快慢由迭代矩阵的<strong>谱半径（最大特征值的模）</strong>决定——
        <router-link to="/linear-algebra/eigen">特征值讲</router-link>在这里又一次决定"长期命运"；
        而共轭梯度需要的迭代次数大约是 <MathInline tex="\sqrt{\kappa}" /> 次，
        所以实战里会先做<strong>预条件</strong>：左乘一个近似逆，把 <MathInline tex="\kappa" /> 压下来再迭代，
        道理和岭回归那一招是同一个；
      </li>
      <li>
        <strong>反问题几乎必然病态</strong>：CT 从投影反推断层、地震波反推地下结构、
        照片去模糊，都是"由结果反推原因"。正向过程往往是<strong>抹平细节</strong>的
        （模糊、衰减、平均），抹平在数值上就是把某些方向的奇异值压到接近零，
        反过来就得除以那个接近零的数——病态是这类问题的<strong>宿命</strong>而非意外。
        医学 CT 里那些"正则化重建"算法，做的正是上面岭回归那件事；
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连，也与第 1 讲首尾呼应</div>
      <p>
        <strong>线性代数</strong>：高斯消元就是 <router-link to="/linear-algebra/elimination">LU 分解</router-link>的浮点版
        （部分主元选取对应 <MathInline tex="PA=LU" /> 里那个置换矩阵 <MathInline tex="P" />，
        它记录的正是"第几步换了哪两行"）；
        <router-link to="/linear-algebra/determinant">行列式</router-link>讲的"det = 0 即压扁"是病态的极限情形，
        但 det 本身不能当病态的尺子（上面那个反例）；而<router-link to="/linear-algebra/linear-map">线性映射</router-link>讲的
        "矩阵把空间拉伸"到这里才被<strong>量化</strong>成两个具体的数——拉得最狠的和压得最扁的。
        <strong>那门课学过的每一件武器，在数值世界里都被重新称量了一遍。</strong>
      </p>
      <p>
        <strong>概率论</strong>：最小二乘本就出自<router-link to="/probability/clt">高斯的误差理论</router-link>——
        他为了从带噪声的天文观测里定谷神星的轨道才发明了它；
        测量噪声若正好落在病态方向上，估计就格外不可靠，这也是实验设计里
        "把采样点摆得分散些"的数学理由，和上面 GPS 那张表说的是同一件事。
        <strong>数值分析本课</strong>：<router-link to="/numerical/interpolation">第 3 讲</router-link>做过拟合实验时
        留了个小尾巴——12 个点配 11 次多项式，训练误差理论上应当<em>恰好为零</em>，实测却是 0.043。
        这一讲能给它指名道姓了：那张拟合用的范德蒙矩阵是出了名的病态
        （12 个等距点、11 次，在 <MathInline tex="[0,1]" /> 上条件数约
        <MathInline tex="8\times10^{8}" />），16 位精度先被吃掉 9 位，
        零就再也不是干净的零了。
      </p>
      <p>
        <strong>与第 1 讲首尾呼应。</strong><router-link to="/numerical/float-error">第 1 讲</router-link>留下一个悬案：
        舍入误差只有 <MathInline tex="10^{-16}" /> 那么小、看着人畜无害，它到底何时会酿成大祸？
        整门课到这里给出了完整答案，而且是<strong>可以逐行核对</strong>的答案——
        用 <MathInline tex="\kappa\times 2.2\times10^{-16}" /> 去预言希尔伯特那张表的误差：
        <MathInline tex="n=6" /> 预言 <MathInline tex="3.3\times10^{-9}" />、实测
        <MathInline tex="3.1\times10^{-10}" />；<MathInline tex="n=10" /> 预言
        <MathInline tex="3.5\times10^{-3}" />、实测 <MathInline tex="1.6\times10^{-4}" />——
        <strong>每一行都落在预言之内，实测比预言小十到二十倍</strong>——差这一截是对的，
        因为 <MathInline tex="\kappa" /> 给的是最坏情况的天花板，而实际的舍入误差不会正好挑最坏的方向。
      </p>
      <p>
        <MathInline tex="\kappa" /> 就是把渺小舍入误差放大成致命错误的那只手。
        整门数值分析可以浓缩成一句话：<strong>误差不会凭空消失，它只会被运算重新分配</strong>——
        减法把它<router-link to="/numerical/float-error">集中放大</router-link>，
        求和把它<router-link to="/numerical/quadrature">摊平</router-link>，
        迭代把它<router-link to="/numerical/root-finding">压缩</router-link>，
        高次插值把它<router-link to="/numerical/interpolation">甩向两端</router-link>，
        而病态矩阵把它<strong>成千上万倍地顶到答案的最前面</strong>。
        五讲讲的是同一件事的五个侧面：<strong>算得出来，和算得可信，是两回事。</strong>
      </p>
    </div>
  </ConceptPage>
</template>

<style scoped>
.tbl-wrap {
  overflow-x: auto;
  margin: 0.9rem 0;
}
.mini-tbl {
  border-collapse: collapse;
  font-size: 0.92rem;
  min-width: 20rem;
}
.mini-tbl th,
.mini-tbl td {
  border: 1px solid var(--line, #e6e1d8);
  padding: 0.32rem 0.7rem;
  text-align: center;
  white-space: nowrap;
}
.mini-tbl thead th {
  background: rgba(0, 0, 0, 0.04);
  font-weight: 600;
}
.mini-tbl td b {
  color: var(--accent, #b23a2f);
}
</style>
