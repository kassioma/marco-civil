// =============================================
// PROTEÇÃO CONTRA CÓPIA
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Bloquear cópia
  document.addEventListener('copy', (e) => e.preventDefault());

  // Bloquear corte
  document.addEventListener('cut', (e) => e.preventDefault());

  // Bloquear menu de contexto (clique direito)
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Bloquear seleção com shift+click
  document.addEventListener('mousedown', (e) => {
    if (e.detail > 1) {
      e.preventDefault();
    }
  });

  // Bloquear drag and drop
  document.addEventListener('dragstart', (e) => e.preventDefault());
  document.addEventListener('drag', (e) => e.preventDefault());
});

// =============================================
// DADOS
// =============================================
const perguntasQuiz = [
  {
    texto: "Qual é o fundamento central da disciplina do uso da internet no Brasil, conforme o Art. 2º da Lei 12.965/2014?",
    opcoes: ["Segurança nacional", "Respeito à liberdade de expressão", "Proteção ao mercado digital", "Desenvolvimento econômico"],
    correta: 1,
    explicacao: "O Art. 2º estabelece que a disciplina do uso da internet no Brasil tem como fundamento o respeito à liberdade de expressão."
  },
  {
    texto: "De acordo com o Art. 7º, a conexão à internet somente pode ser suspensa em qual situação?",
    opcoes: ["Por ordem do provedor", "Por determinação policial", "Por débito diretamente decorrente de sua utilização", "Por solicitação judicial"],
    correta: 2,
    explicacao: "O inciso IV do Art. 7º garante a não suspensão da conexão à internet, salvo por débito diretamente decorrente de sua utilização."
  },
  {
    texto: "O que é a neutralidade de rede, protegida pelo Art. 9º?",
    opcoes: ["Proibição de cobrança pelo acesso", "Tratamento isonômico dos pacotes de dados, sem distinção por conteúdo ou origem", "Garantia de velocidade igual para todos os usuários", "Proibição de censura política na internet"],
    correta: 1,
    explicacao: "O Art. 9º determina que o responsável pela transmissão tem o dever de tratar de forma isonômica quaisquer pacotes de dados, sem distinção por conteúdo, origem e destino."
  },
  {
    texto: "Por quanto tempo os provedores de conexão devem guardar os registros de conexão, conforme o Art. 13?",
    opcoes: ["3 meses", "6 meses", "1 ano", "2 anos"],
    correta: 2,
    explicacao: "O Art. 13 estabelece que o administrador de sistema autônomo deve manter os registros de conexão pelo prazo de 1 (um) ano."
  },
  {
    texto: "O provedor de aplicações de internet pode ser responsabilizado civilmente por conteúdo gerado por terceiros se:",
    opcoes: ["O conteúdo for denunciado por usuários", "Após ordem judicial específica, não tornar o conteúdo indisponível no prazo", "O conteúdo ofender valores morais", "Receber reclamação formal do usuário lesado"],
    correta: 1,
    explicacao: "Conforme o Art. 19, o provedor somente poderá ser responsabilizado se, após ordem judicial específica, não tomar as providências para tornar indisponível o conteúdo infringente."
  },
  {
    texto: "Qual é o prazo mínimo que os provedores de aplicações de internet (empresas com fins econômicos) devem guardar registros de acesso, conforme o Art. 15?",
    opcoes: ["3 meses", "6 meses", "1 ano", "18 meses"],
    correta: 1,
    explicacao: "O Art. 15 determina que provedores de aplicações com fins econômicos devem manter os registros de acesso a aplicações de internet pelo prazo de 6 (seis) meses."
  },
  {
    texto: "Segundo o Art. 11, quando a lei brasileira se aplica às operações de provedores estrangeiros?",
    opcoes: ["Apenas quando a sede está no Brasil", "Somente se houver contrato com empresa brasileira", "Quando pelo menos um ato ocorra em território nacional ou oferte serviço ao público brasileiro", "Nunca se aplica a empresas estrangeiras"],
    correta: 2,
    explicacao: "O Art. 11 determina que qualquer operação onde pelo menos um ato ocorra em território nacional deve respeitar a legislação brasileira, mesmo que realizadas por empresa sediada no exterior."
  },
  {
    texto: "Qual princípio do Art. 3º garante que os dados do usuário trafeguem com proteção?",
    opcoes: ["Livre iniciativa", "Preservação da neutralidade de rede", "Proteção da privacidade", "Natureza participativa da rede"],
    correta: 2,
    explicacao: "O inciso II do Art. 3º elenca a proteção da privacidade como um dos princípios da disciplina do uso da internet no Brasil."
  },
  {
    texto: "O Art. 21 trata de responsabilidade subsidiária do provedor em qual situação específica?",
    opcoes: ["Disseminação de fake news", "Publicidade enganosa online", "Divulgação não autorizada de imagens íntimas após notificação do participante", "Violação de direitos autorais musicais"],
    correta: 2,
    explicacao: "O Art. 21 responsabiliza subsidiariamente o provedor que, após notificação do participante, deixar de retirar imagens ou vídeos íntimos divulgados sem autorização."
  },
  {
    texto: "O acesso à internet, conforme o Art. 7º, é considerado:",
    opcoes: ["Um privilégio dos cidadãos", "Um serviço opcional", "Essencial ao exercício da cidadania", "Uma concessão do Estado"],
    correta: 2,
    explicacao: "O caput do Art. 7º estabelece que o acesso à internet é essencial ao exercício da cidadania."
  }
];

const afirmacoesVF = [
  { texto: "O provedor de conexão pode ser responsabilizado por danos causados por conteúdo gerado por terceiros.", correto: false, art: "Art. 18", explicacao: "FALSO. O Art. 18 estabelece que o provedor de conexão à internet NÃO será responsabilizado civilmente por danos decorrentes de conteúdo gerado por terceiros." },
  { texto: "O sigilo das comunicações privadas pode ser quebrado mediante ordem judicial.", correto: true, art: "Art. 7º, III", explicacao: "VERDADEIRO. O Art. 7º, inciso III, garante a inviolabilidade das comunicações privadas armazenadas, SALVO por ordem judicial." },
  { texto: "É proibido bloquear, monitorar ou filtrar o conteúdo dos pacotes de dados na provisão de conexão.", correto: true, art: "Art. 9º, §3º", explicacao: "VERDADEIRO. O Art. 9º, §3º, veda o bloqueio, monitoramento, filtragem ou análise do conteúdo dos pacotes de dados na provisão de conexão." },
  { texto: "Os dados pessoais dos usuários podem ser fornecidos a terceiros sem consentimento, se solicitados por empresas parceiras.", correto: false, art: "Art. 7º, VII", explicacao: "FALSO. O Art. 7º, inciso VII, proíbe o fornecimento de dados pessoais a terceiros sem consentimento livre, expresso e informado do usuário." },
  { texto: "O usuário tem direito à exclusão definitiva de seus dados pessoais ao término da relação com a aplicação de internet.", correto: true, art: "Art. 7º, X", explicacao: "VERDADEIRO. O Art. 7º, inciso X, garante o direito à exclusão definitiva dos dados pessoais ao término da relação, ressalvadas hipóteses de guarda obrigatória." },
  { texto: "A discriminação de tráfego de dados é sempre proibida, sem qualquer exceção.", correto: false, art: "Art. 9º, §1º", explicacao: "FALSO. O Art. 9º, §1º, admite a discriminação em casos de requisitos técnicos indispensáveis à prestação adequada dos serviços e priorização de serviços de emergência." },
  { texto: "A lei se aplica apenas a empresas sediadas no Brasil.", correto: false, art: "Art. 11, §2º", explicacao: "FALSO. O Art. 11, §2º, determina que a lei se aplica mesmo que as atividades sejam realizadas por pessoa jurídica sediada no exterior, desde que oferte serviço ao público brasileiro." },
  { texto: "O conteúdo das comunicações privadas pode ser disponibilizado apenas mediante ordem judicial.", correto: true, art: "Art. 10, §2º", explicacao: "VERDADEIRO. O Art. 10, §2º, estabelece que o conteúdo de comunicações privadas somente poderá ser disponibilizado mediante ordem judicial." },
  { texto: "O usuário deve consentir de forma expressa para a coleta de seus dados pessoais.", correto: true, art: "Art. 7º, IX", explicacao: "VERDADEIRO. O Art. 7º, inciso IX, exige consentimento expresso sobre coleta, uso, armazenamento e tratamento de dados pessoais, destacado das demais cláusulas." },
  { texto: "O prazo para guarda dos registros de conexão pelo administrador de sistema autônomo é de 6 meses.", correto: false, art: "Art. 13", explicacao: "FALSO. O Art. 13 estabelece o prazo de 1 (um) ANO para a guarda dos registros de conexão. O prazo de 6 meses é para registros de acesso a aplicações (Art. 15)." },
  { texto: "Cláusulas contratuais que violem a inviolabilidade das comunicações privadas são nulas de pleno direito.", correto: true, art: "Art. 8º, §ú", explicacao: "VERDADEIRO. O Art. 8º, parágrafo único, declara nulas as cláusulas que impliquem ofensa à inviolabilidade e ao sigilo das comunicações privadas." },
  { texto: "O acesso à internet é considerado essencial ao exercício da cidadania pela Lei 12.965/2014.", correto: true, art: "Art. 7º", explicacao: "VERDADEIRO. O caput do Art. 7º afirma expressamente que 'o acesso à internet é essencial ao exercício da cidadania'." }
];

const paresMemoria = [
  { conceito: "🌐", termo: "INTERNET", definicao: "Sistema de protocolos lógicos estruturado em escala mundial para uso público e irrestrito" },
  { conceito: "📍", termo: "ENDEREÇO IP", definicao: "Código atribuído a um terminal de uma rede para permitir sua identificação" },
  { conceito: "🔒", termo: "NEUTRALIDADE", definicao: "Tratamento isonômico de pacotes de dados sem distinção por conteúdo ou origem" },
  { conceito: "📋", termo: "REG. CONEXÃO", definicao: "Informações sobre data, hora de início/término de uma conexão e IP utilizado" },
  { conceito: "💻", termo: "TERMINAL", definicao: "Computador ou qualquer dispositivo que se conecte à internet" },
  { conceito: "📱", termo: "APLICAÇÃO", definicao: "Conjunto de funcionalidades acessíveis por meio de terminal conectado à internet" },
  { conceito: "🛡️", termo: "PRIVACIDADE", definicao: "Princípio que protege a intimidade e vida privada dos usuários online" },
  { conceito: "⚖️", termo: "JUSTA CAUSA", definicao: "Requisito para exclusão ou suspensão de conta em redes sociais conforme a lei" }
];

// =============================================
// STORAGE — PROGRESSO SALVO
// =============================================
let progresso = { quiz: null, vf: null, memoria: null, caca: null };

async function carregarProgresso() {
  try {
    const r = await window.storage.get('marco-civil-progresso');
    if (r && r.value) progresso = JSON.parse(r.value);
  } catch(e) { progresso = { quiz: null, vf: null, memoria: null, caca: null }; }
  renderBadges();
}

async function salvarProgresso() {
  try { await window.storage.set('marco-civil-progresso', JSON.stringify(progresso)); } catch(e) {}
}

function renderBadges() {
  const configs = [
    { key: 'quiz',    id: 'badge-quiz',    card: 'card-quiz',
      label: d => d.concluido ? `🏆 ${d.pontos}/100 pts` : `▶ Em progresso: Q${d.idx+1}/10` },
    { key: 'vf',      id: 'badge-vf',      card: 'card-vf',
      label: d => d.concluido ? `🏆 ${d.pontos}/12 acertos` : `▶ Em progresso: ${d.idx+1}/12` },
    { key: 'memoria', id: 'badge-memoria', card: 'card-memoria',
      label: d => d.concluido ? `🏆 Concluído em ${d.tentativas} tent.` : `▶ ${d.pares}/8 pares` },
    { key: 'caca',    id: 'badge-caca',    card: 'card-caca',
      label: d => d.concluido ? `🏆 Todas as palavras!` : `▶ ${d.encontradas}/8 palavras` },
  ];

  configs.forEach(({ key, id, card, label }) => {
    const badge = document.getElementById(id);
    const cardEl = document.getElementById(card);
    const d = progresso[key];
    if (!badge || !cardEl) return;

    if (!d) {
      badge.textContent = 'Não jogado';
      badge.className = 'progresso-badge zerado';
      cardEl.classList.remove('concluido');
    } else {
      badge.textContent = label(d);
      badge.className = 'progresso-badge';
      if (d.concluido) cardEl.classList.add('concluido');
      else cardEl.classList.remove('concluido');
    }
  });
}

// =============================================
// CONTROLE DE TELAS
// =============================================
function mostrarTela(id) {
  document.querySelectorAll('.tela, #tela-inicio').forEach(t => {
    t.style.display = 'none';
    t.classList.remove('ativa');
  });
  const el = document.getElementById(id);
  el.style.display = 'block';
  el.classList.add('ativa');
  window.scrollTo(0, 0);
}

function voltarInicio() {
  renderBadges();
  mostrarTela('tela-inicio');
}

// =============================================
// QUIZ
// =============================================
let qIdx = 0, qPontos = 0;

function iniciarQuiz() {
  qIdx = 0; qPontos = 0;
  progresso.quiz = { idx: 0, pontos: 0, concluido: false };
  salvarProgresso();
  mostrarTela('tela-quiz');
  renderPergunta();
}

function renderPergunta() {
  const p = perguntasQuiz[qIdx];
  document.getElementById('q-atual').textContent = qIdx + 1;
  document.getElementById('q-pontos').textContent = qPontos;
  document.getElementById('q-num').textContent = `QUESTÃO ${String(qIdx+1).padStart(2,'0')}`;
  document.getElementById('q-texto').textContent = p.texto;
  document.getElementById('q-barra').style.width = (qIdx/10*100)+'%';

  const opcDiv = document.getElementById('q-opcoes');
  opcDiv.innerHTML = '';
  p.opcoes.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.className = 'opcao-btn';
    btn.textContent = String.fromCharCode(65+i) + ') ' + op;
    btn.onclick = () => responderQuiz(i, btn);
    opcDiv.appendChild(btn);
  });

  const fb = document.getElementById('q-feedback');
  fb.className = 'feedback';
  fb.textContent = '';
  document.getElementById('btn-prox').classList.remove('show');
}

function responderQuiz(idx, btnClicado) {
  const p = perguntasQuiz[qIdx];
  const btns = document.querySelectorAll('.opcao-btn');
  btns.forEach(b => b.disabled = true);

  const fb = document.getElementById('q-feedback');

  if (idx === p.correta) {
    btnClicado.classList.add('correta');
    qPontos += 10;
    document.getElementById('q-pontos').textContent = qPontos;
    fb.className = 'feedback ok show';
    fb.textContent = '✓ Correto! ' + p.explicacao;
  } else {
    btnClicado.classList.add('errada');
    btns[p.correta].classList.add('correta');
    fb.className = 'feedback err show';
    fb.textContent = '✗ Incorreto. ' + p.explicacao;
  }

  progresso.quiz = { idx: qIdx, pontos: qPontos, concluido: false };
  salvarProgresso();

  document.getElementById('btn-prox').classList.add('show');
  document.getElementById('btn-prox').textContent = qIdx < 9 ? 'Próxima →' : 'Ver Resultado →';
}

function proximaPergunta() {
  qIdx++;
  if (qIdx >= perguntasQuiz.length) {
    progresso.quiz = { idx: 9, pontos: qPontos, concluido: true };
    salvarProgresso();
    mostrarResultado('quiz', qPontos, 100);
  } else {
    progresso.quiz = { idx: qIdx, pontos: qPontos, concluido: false };
    salvarProgresso();
    renderPergunta();
  }
}

// =============================================
// VERDADEIRO OU FALSO
// =============================================
let vfIdx = 0, vfPontos = 0;
let vfOrdem = [];

function iniciarVF() {
  vfIdx = 0; vfPontos = 0;
  vfOrdem = [...afirmacoesVF].sort(() => Math.random() - 0.5);
  progresso.vf = { idx: 0, pontos: 0, concluido: false };
  salvarProgresso();
  mostrarTela('tela-vf');
  renderVF();
}

function renderVF() {
  const a = vfOrdem[vfIdx];
  document.getElementById('vf-atual').textContent = vfIdx + 1;
  document.getElementById('vf-pontos').textContent = vfPontos;
  document.getElementById('vf-barra').style.width = (vfIdx/12*100)+'%';

  const card = document.getElementById('vf-afirmacao');
  card.textContent = a.texto;
  card.setAttribute('data-art', a.art);

  document.getElementById('btn-v').className = 'vf-btn verdadeiro';
  document.getElementById('btn-f').className = 'vf-btn falso';
  document.getElementById('btn-v').disabled = false;
  document.getElementById('btn-f').disabled = false;

  const fb = document.getElementById('vf-feedback');
  fb.className = 'feedback';
  document.getElementById('btn-vf-prox').classList.remove('show');
}

function responderVF(resposta) {
  const a = vfOrdem[vfIdx];
  const fb = document.getElementById('vf-feedback');
  document.getElementById('btn-v').disabled = true;
  document.getElementById('btn-f').disabled = true;

  if (resposta === a.correto) {
    vfPontos++;
    document.getElementById('vf-pontos').textContent = vfPontos;
    fb.className = 'feedback ok show';
    fb.textContent = '✓ ' + a.explicacao;
    if (resposta) document.getElementById('btn-v').classList.add('acertou');
    else document.getElementById('btn-f').classList.add('acertou');
  } else {
    fb.className = 'feedback err show';
    fb.textContent = '✗ ' + a.explicacao;
    if (resposta) document.getElementById('btn-v').classList.add('errou');
    else document.getElementById('btn-f').classList.add('errou');
  }

  progresso.vf = { idx: vfIdx, pontos: vfPontos, concluido: false };
  salvarProgresso();

  document.getElementById('btn-vf-prox').classList.add('show');
  document.getElementById('btn-vf-prox').textContent = vfIdx < 11 ? 'Próxima →' : 'Ver Resultado →';
}

function proximaVF() {
  vfIdx++;
  if (vfIdx >= 12) {
    progresso.vf = { idx: 11, pontos: vfPontos, concluido: true };
    salvarProgresso();
    mostrarResultado('vf', vfPontos, 12);
  } else {
    progresso.vf = { idx: vfIdx, pontos: vfPontos, concluido: false };
    salvarProgresso();
    renderVF();
  }
}

// =============================================
// JOGO DA MEMÓRIA
// =============================================
let memViradas = [], memPares = 0, memTentativas = 0, memBloqueio = false;
let memCartas = [];

function iniciarMemoria() {
  memViradas = []; memPares = 0; memTentativas = 0; memBloqueio = false;
  progresso.memoria = { pares: 0, tentativas: 0, concluido: false };
  salvarProgresso();
  document.getElementById('btn-mem-novo').style.display = 'none';
  mostrarTela('tela-memoria');

  const cartas = [];
  paresMemoria.forEach((p, i) => {
    cartas.push({ id: i*2, par: i, tipo: 'conceito', conteudo: p.conceito + ' ' + p.termo, verde: false });
    cartas.push({ id: i*2+1, par: i, tipo: 'definicao', conteudo: p.definicao, verde: true });
  });
  memCartas = cartas.sort(() => Math.random() - 0.5);

  const grid = document.getElementById('memoria-grid');
  grid.innerHTML = '';

  memCartas.forEach((c, idx) => {
    const div = document.createElement('div');
    div.className = 'mem-card';
    div.dataset.idx = idx;
    div.innerHTML = `
      <div class="mem-frente">🎴</div>
      <div class="mem-verso ${c.verde ? 'verde' : ''}">${c.conteudo}</div>
    `;
    div.onclick = () => virarCarta(idx);
    grid.appendChild(div);
  });
}

function virarCarta(idx) {
  if (memBloqueio) return;
  const carta = document.querySelector(`[data-idx="${idx}"]`);
  if (!carta || carta.classList.contains('virado') || carta.classList.contains('par')) return;

  carta.classList.add('virado');
  memViradas.push(idx);

  if (memViradas.length === 2) {
    memBloqueio = true;
    memTentativas++;
    document.getElementById('mem-tent').textContent = memTentativas;

    const [a, b] = memViradas;
    const cA = memCartas[a], cB = memCartas[b];

    setTimeout(() => {
      if (cA.par === cB.par) {
        document.querySelector(`[data-idx="${a}"]`).classList.add('par');
        document.querySelector(`[data-idx="${b}"]`).classList.add('par');
        memPares++;
        document.getElementById('mem-pares').textContent = memPares;
        progresso.memoria = { pares: memPares, tentativas: memTentativas, concluido: memPares === 8 };
        salvarProgresso();
        if (memPares === 8) {
          setTimeout(() => {
            document.getElementById('btn-mem-novo').style.display = 'block';
          }, 500);
        }
      } else {
        document.querySelector(`[data-idx="${a}"]`).classList.remove('virado');
        document.querySelector(`[data-idx="${b}"]`).classList.remove('virado');
      }
      memViradas = [];
      memBloqueio = false;
    }, 1000);
  }
}

// =============================================
// CAÇA-PALAVRAS
// =============================================
const palavrasCaca = ['PRIVACIDADE','NEUTRALIDADE','INTERNET','TERMINAL','PROTOCOLO','REGISTRO','USUARIO','CONEXAO'];

let cacaGrid = [], cacaEncontradas = new Set();
let cacaSelecionadas = [];
let cacaMouseDown = false;

function iniciarCaca() {
  cacaEncontradas = new Set();
  cacaSelecionadas = [];
  progresso.caca = { encontradas: 0, concluido: false };
  salvarProgresso();
  mostrarTela('tela-caca');
  gerarCaca();
}

function gerarCaca() {
  const LINHAS = 14, COLS = 14;
  const grid = Array.from({length: LINHAS}, () => Array(COLS).fill(''));

  const direcoes = [[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,-1],[1,-1],[-1,1]];
  const posicoes = {};

  palavrasCaca.forEach(palavra => {
    let colocada = false;
    let tentativas = 0;
    while (!colocada && tentativas < 200) {
      tentativas++;
      const [dr, dc] = direcoes[Math.floor(Math.random()*direcoes.length)];
      const lr = Math.floor(Math.random()*LINHAS);
      const lc = Math.floor(Math.random()*COLS);
      const ok = palavra.split('').every((ch, i) => {
        const r = lr + dr*i, c = lc + dc*i;
        return r>=0 && r<LINHAS && c>=0 && c<COLS && (grid[r][c]==='' || grid[r][c]===ch);
      });
      if (ok) {
        const cells = [];
        palavra.split('').forEach((ch, i) => {
          const r = lr + dr*i, c = lc + dc*i;
          grid[r][c] = ch;
          cells.push(r*COLS+c);
        });
        posicoes[palavra] = cells;
        colocada = true;
      }
    }
  });

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r=0; r<LINHAS; r++)
    for (let c=0; c<COLS; c++)
      if (!grid[r][c]) grid[r][c] = letras[Math.floor(Math.random()*26)];

  cacaGrid = { grid, posicoes, LINHAS, COLS };
  renderCaca();
}

function renderCaca() {
  const { grid, LINHAS, COLS } = cacaGrid;
  const el = document.getElementById('caca-grid');
  el.style.gridTemplateColumns = `repeat(${COLS}, 34px)`;
  el.innerHTML = '';

  for (let r=0; r<LINHAS; r++) {
    for (let c=0; c<COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'caca-cell';
      cell.textContent = grid[r][c];
      cell.dataset.pos = r*COLS+c;
      el.appendChild(cell);
    }
  }

  el.onmousedown = (e) => {
    cacaMouseDown = true;
    cacaSelecionadas = [];
    const cell = e.target.closest('.caca-cell');
    if (cell) { cacaSelecionadas.push(parseInt(cell.dataset.pos)); atualizarSel(); }
  };
  el.onmouseover = (e) => {
    if (!cacaMouseDown) return;
    const cell = e.target.closest('.caca-cell');
    if (cell) {
      const p = parseInt(cell.dataset.pos);
      if (!cacaSelecionadas.includes(p)) { cacaSelecionadas.push(p); atualizarSel(); }
    }
  };
  el.onmouseup = () => { cacaMouseDown = false; verificarPalavra(); };
  el.ontouchstart = (e) => { cacaMouseDown = true; cacaSelecionadas = []; const t = e.touches[0]; const cell = document.elementFromPoint(t.clientX, t.clientY)?.closest('.caca-cell'); if(cell){cacaSelecionadas.push(parseInt(cell.dataset.pos));atualizarSel();} };
  el.ontouchmove = (e) => { e.preventDefault(); const t = e.touches[0]; const cell = document.elementFromPoint(t.clientX, t.clientY)?.closest('.caca-cell'); if(cell){const p=parseInt(cell.dataset.pos);if(!cacaSelecionadas.includes(p)){cacaSelecionadas.push(p);atualizarSel();}} };
  el.ontouchend = () => { cacaMouseDown = false; verificarPalavra(); };

  const lista = document.getElementById('palavras-lista');
  lista.innerHTML = '';
  palavrasCaca.forEach(p => {
    const tag = document.createElement('div');
    tag.className = 'palavra-tag';
    tag.id = 'tag-'+p;
    tag.textContent = p;
    lista.appendChild(tag);
  });
  document.getElementById('caca-count').textContent = 0;
}

function atualizarSel() {
  document.querySelectorAll('.caca-cell').forEach(c => {
    if (!c.classList.contains('encontrada')) c.classList.remove('selecionada');
  });
  cacaSelecionadas.forEach(p => {
    const c = document.querySelector(`[data-pos="${p}"]`);
    if (c && !c.classList.contains('encontrada')) c.classList.add('selecionada');
  });
}

function verificarPalavra() {
  const { posicoes } = cacaGrid;
  const sel = [...cacaSelecionadas];

  for (const [palavra, cells] of Object.entries(posicoes)) {
    if (cacaEncontradas.has(palavra)) continue;
    const frente = cells.every((c,i) => sel[i]===c);
    const tras = cells.every((c,i) => sel[i]===cells[cells.length-1-i]);
    if ((frente || tras) && sel.length === cells.length) {
      cacaEncontradas.add(palavra);
      cells.forEach(p => {
        const c = document.querySelector(`[data-pos="${p}"]`);
        if (c) { c.classList.remove('selecionada'); c.classList.add('encontrada'); }
      });
      const tag = document.getElementById('tag-'+palavra);
      if (tag) tag.classList.add('achada');
      document.getElementById('caca-count').textContent = cacaEncontradas.size;
      progresso.caca = { encontradas: cacaEncontradas.size, concluido: cacaEncontradas.size === 8 };
      salvarProgresso();
      cacaSelecionadas = [];
      return;
    }
  }

  cacaSelecionadas = [];
  atualizarSel();
}

// =============================================
// RESULTADO FINAL
// =============================================
function mostrarResultado(tipo, pontos, total) {
  const pct = Math.round(pontos/total*100);
  let estrelas = pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐';
  let msg = pct >= 80 ? 'Excelente! Você domina o Marco Civil!' : pct >= 50 ? 'Bom trabalho! Continue estudando.' : 'Continue praticando! A lei é importante.';

  const tipoLabel = tipo === 'quiz' ? 'pontos de 100' : `acertos de ${total}`;
  const corTipo = tipo === 'quiz' ? '#00e676' : '#ffd600';

  const tela = document.getElementById('tela-' + tipo);
  tela.innerHTML = `
    <button class="btn-voltar" onclick="voltarInicio()">← Voltar ao Menu</button>
    <div class="resultado">
      <div class="estrelas">${estrelas}</div>
      <div style="font-family:'Syne',sans-serif;font-size:1rem;color:#8899bb">Sua pontuação</div>
      <div class="nota-final" style="background: linear-gradient(135deg, ${corTipo}, #0d47a1); -webkit-background-clip:text; -webkit-text-fill-color:transparent">${pontos}</div>
      <div style="font-size:0.85rem;color:#8899bb;margin-bottom:1rem">${tipoLabel} — ${pct}%</div>
      <p style="color:#c8d8ff;font-size:0.9rem;line-height:1.7">${msg}</p>
      <button class="btn-reiniciar" onclick="${tipo === 'quiz' ? 'iniciarQuiz' : 'iniciarVF'}()">↺ Jogar Novamente</button>
    </div>
  `;
}

// Inicializa
mostrarTela('tela-inicio');
carregarProgresso();
