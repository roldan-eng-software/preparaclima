export type FasePlano = "antes" | "durante" | "depois";

export interface ItemPlano {
  id: string;
  titulo: string;
  descricao: string;
  revisao?: string;
}

export interface PlanoRisco {
  risco: string;
  titulo: string;
  fases: Record<FasePlano, ItemPlano[]>;
}

export const FASES_ROTULOS: Record<
  FasePlano,
  { titulo: string; icone: string }
> = {
  antes: { titulo: "Antes — Prepare-se", icone: "🟢" },
  durante: { titulo: "Durante — Aja rápido", icone: "🟡" },
  depois: { titulo: "Depois — Recupere-se", icone: "🔵" },
};

export const PLANOS: PlanoRisco[] = [
  {
    risco: "enchente",
    titulo: "Enchentes",
    fases: {
      antes: [
        {
          id: "enchente-antes-1",
          titulo: "Monte o kit de emergência",
          descricao:
            "Mochila com água (1L por pessoa/dia para 3 dias), alimentos não-perecíveis, lanterna + pilhas, kit de primeiros socorros e documentos em saco plástico vedado.",
          revisao: "Revisar a cada 6 meses",
        },
        {
          id: "enchente-antes-2",
          titulo: "Saiba sua rota de fuga",
          descricao:
            "Descubra o ponto mais alto perto de casa e dois caminhos para chegar lá. Combine com a família um ponto de encontro fora da área de risco.",
        },
        {
          id: "enchente-antes-3",
          titulo: "Proteja documentos e remédios",
          descricao:
            "Guarde RG, CPF, certidões, receitas e remédios de uso contínuo em saco plástico com dessecante, em local alto e de fácil acesso.",
        },
        {
          id: "enchente-antes-4",
          titulo: "Cadastre-se nos alertas da Defesa Civil",
          descricao:
            "Envie seu CEP por SMS para 40199 para receber alertas da sua região. Salve os telefones 193 (Bombeiros) e 190 (Polícia) no celular.",
        },
      ],
      durante: [
        {
          id: "enchente-durante-1",
          titulo: "Desligue energia e gás",
          descricao:
            "Antes de sair, desligue o registro de energia no quadro de luz e feche o registro do gás. Não toque em equipamentos elétricos molhados.",
        },
        {
          id: "enchente-durante-2",
          titulo: "Evacue com calma para local alto",
          descricao:
            "Saia com o kit de emergência pela rota combinada. Não atravesse correntezas: 15 cm de água em movimento já derrubam uma pessoa.",
        },
        {
          id: "enchente-durante-3",
          titulo: "Avise família e vizinhos",
          descricao:
            "Ligue ou mande mensagem para seus contatos de emergência avisando para onde você está indo. Ajude idosos e crianças primeiro.",
        },
        {
          id: "enchente-durante-4",
          titulo: "Não beba nem use água da enchente",
          descricao:
            "Água de enchente está contaminada. Use só a água do kit até orientação da Defesa Civil.",
        },
      ],
      depois: [
        {
          id: "enchente-depois-1",
          titulo: "Volte só com autorização",
          descricao:
            "Retorne apenas quando a Defesa Civil liberar. Verifique rachaduras e fios expostos antes de entrar.",
        },
        {
          id: "enchente-depois-2",
          titulo: "Limpe com proteção",
          descricao:
            "Use luvas, botas e máscara. Descarte alimentos que molharam. Lave tudo com água e sabão, depois desinfete com água sanitária.",
        },
        {
          id: "enchente-depois-3",
          titulo: "Cuide da saúde",
          descricao:
            "Observe febre, diarreia ou feridas infeccionadas nos dias seguintes. Procure a UPA se algo aparecer. Atualize vacinas se orientado.",
        },
        {
          id: "enchente-depois-4",
          titulo: "Registre perdas para o seguro",
          descricao:
            "Fotografe os danos antes de limpar tudo. Guarde notas de gastos com limpeza e reparos para acionar seguro ou ajuda municipal.",
        },
      ],
    },
  },
  {
    risco: "deslizamento",
    titulo: "Deslizamentos",
    fases: {
      antes: [
        {
          id: "deslizamento-antes-1",
          titulo: "Observe os sinais do terreno",
          descricao:
            "Fique atento a rachaduras no solo e nas paredes, árvores ou postes inclinando, água brotando do barranco e estalos ou rangidos.",
        },
        {
          id: "deslizamento-antes-2",
          titulo: "Monte o kit de emergência",
          descricao:
            "Mochila com água, alimentos, lanterna, primeiros socorros e documentos em saco plástico, sempre pronta perto da saída.",
          revisao: "Revisar a cada 6 meses",
        },
        {
          id: "deslizamento-antes-3",
          titulo: "Defina a rota de fuga",
          descricao:
            "Saiba o caminho mais rápido para sair da encosta em direção a terreno firme e alto. Combine um ponto de encontro com a família.",
        },
        {
          id: "deslizamento-antes-4",
          titulo: "Não faça cortes ou aterros sem orientação",
          descricao:
            "Não jogue lixo ou entulho na encosta e não faça construções ou cortes no barranco sem avaliação técnica da prefeitura.",
        },
      ],
      durante: [
        {
          id: "deslizamento-durante-1",
          titulo: "Saia imediatamente ao primeiro sinal",
          descricao:
            "Rachadura nova, barulho estranho ou água brotando: saia na hora com o kit. Não volte para buscar objetos.",
        },
        {
          id: "deslizamento-durante-2",
          titulo: "Afaste-se lateralmente da encosta",
          descricao:
            "Corra para os lados, perpendicular à descida, em direção a terreno firme. Nunca corra morro abaixo na frente do deslizamento.",
        },
        {
          id: "deslizamento-durante-3",
          titulo: "Acione a Defesa Civil",
          descricao:
            "Ligue 193 ou para a Defesa Civil do município avisando o local. Avise vizinhos pelo caminho.",
        },
        {
          id: "deslizamento-durante-4",
          titulo: "Não atravesse áreas deslizadas",
          descricao:
            "O terreno pode ceder de novo. Aguarde avaliação técnica antes de voltar ou passar pelo local.",
        },
      ],
      depois: [
        {
          id: "deslizamento-depois-1",
          titulo: "Volte só com liberação técnica",
          descricao:
            "Aguarde a Defesa Civil avaliar o terreno. Encostas podem deslizar de novo dias depois da chuva.",
        },
        {
          id: "deslizamento-depois-2",
          titulo: "Verifique a casa com cuidado",
          descricao:
            "Observe novas rachaduras, portas que não fecham e vazamentos. Fotografe tudo antes de mexer.",
        },
        {
          id: "deslizamento-depois-3",
          titulo: "Limpe calhas e drenagem",
          descricao:
            "Desentupa calhas e canaletas. Água acumulada aumenta o risco de novo deslizamento.",
        },
        {
          id: "deslizamento-depois-4",
          titulo: "Busque orientação da prefeitura",
          descricao:
            "Peça vistoria e pergunte sobre obras de contenção e programas de reassentamento, se a área for de alto risco.",
        },
      ],
    },
  },
  {
    risco: "seca",
    titulo: "Secas / Estiagem",
    fases: {
      antes: [
        {
          id: "seca-antes-1",
          titulo: "Reserve água limpa",
          descricao:
            "Guarde água potável em garrafas e caixas d'água limpas com tampa: o ideal é 20L por pessoa para os primeiros dias de racionamento.",
          revisao: "Trocar a cada 6 meses",
        },
        {
          id: "seca-antes-2",
          titulo: "Reduza o consumo diário",
          descricao:
            "Conserte vazamentos, reaproveite água da máquina para limpeza e quintal, e tome banhos mais curtos. Cada gota conta.",
        },
        {
          id: "seca-antes-3",
          titulo: "Estoque alimentos básicos",
          descricao:
            "Mantenha arroz, feijão, farinha e enlatados para algumas semanas. Em estiagem longa, preços sobem e faltas acontecem.",
        },
        {
          id: "seca-antes-4",
          titulo: "Proteja quem é vulnerável ao calor",
          descricao:
            "Idosos, crianças e doentes sofrem mais. Garanta local fresco, hidratação frequente e remédios em estoque.",
        },
      ],
      durante: [
        {
          id: "seca-durante-1",
          titulo: "Racione a água com prioridade",
          descricao:
            "Primeiro beber e cozinhar, depois higiene, por último limpeza. Siga o rodízio da companhia de água da sua cidade.",
        },
        {
          id: "seca-durante-2",
          titulo: "Busque os pontos de distribuição",
          descricao:
            "Acompanhe os pontos de carro-pipa e distribuição da prefeitura e da Defesa Civil. Leve vasilhas limpas com tampa.",
        },
        {
          id: "seca-durante-3",
          titulo: "Evite queimadas a todo custo",
          descricao:
            "Não queime lixo ou mato: na seca o fogo se espalha rápido. Avise os Bombeiros (193) ao ver fumaça.",
        },
        {
          id: "seca-durante-4",
          titulo: "Cuide da saúde no calor e na poeira",
          descricao:
            "Beba água mesmo sem sede, evite sol das 10h às 16h e procure atendimento em caso de tontura, febre ou falta de ar.",
        },
      ],
      depois: [
        {
          id: "seca-depois-1",
          titulo: "Limpe e proteja reservatórios",
          descricao:
            "Lave caixas d'água e cisternas antes das chuvas. Mantenha tampas para evitar dengue.",
        },
        {
          id: "seca-depois-2",
          titulo: "Retome o consumo aos poucos",
          descricao:
            "Mesmo com a volta da água, mantenha hábitos de economia. O sistema leva tempo para se recuperar.",
        },
        {
          id: "seca-depois-3",
          titulo: "Verifique plantações e animais",
          descricao:
            "Avalie perdas, replante com variedades resistentes e vacine animais debilitados com orientação técnica.",
        },
        {
          id: "seca-depois-4",
          titulo: "Busque auxílios disponíveis",
          descricao:
            "Informe-se sobre seguro rural, bolsa estiagem e renegociação de dívidas agrícolas no seu município.",
        },
      ],
    },
  },
  {
    risco: "vendaval",
    titulo: "Vendavais / Tempestades",
    fases: {
      antes: [
        {
          id: "vendaval-antes-1",
          titulo: "Reforce telhados e janelas",
          descricao:
            "Prenda telhas soltas, verifique calhas e tenha tábuas ou lonas para proteger janelas em caso de granizo.",
          revisao: "Revisar antes do período de chuvas",
        },
        {
          id: "vendaval-antes-2",
          titulo: "Pode árvores e prenda objetos soltos",
          descricao:
            "Galhos sobre fios e telhados devem ser podados com a prefeitura. Guarde vasos, cadeiras e antenas soltas do quintal.",
        },
        {
          id: "vendaval-antes-3",
          titulo: "Monte o kit de emergência",
          descricao:
            "Lanterna + pilhas, rádio a pilha, água, alimentos, primeiros socorros e documentos em saco plástico. Quedas de energia são comuns.",
        },
        {
          id: "vendaval-antes-4",
          titulo: "Saiba onde se abrigar",
          descricao:
            "Escolha um cômodo interno sem janelas (corredor, banheiro) como abrigo. Combine com a família para onde ir se estiverem fora.",
        },
      ],
      durante: [
        {
          id: "vendaval-durante-1",
          titulo: "Abrigue-se longe de janelas",
          descricao:
            "Fique no cômodo interno escolhido, longe de vidros. Em granizo forte, proteja a cabeça com colchão ou cobertor.",
        },
        {
          id: "vendaval-durante-2",
          titulo: "Desligue eletrônicos da tomada",
          descricao:
            "Raios queimam aparelhos. Desligue TV, computador e desligue o disjuntor se a rede oscilar muito.",
        },
        {
          id: "vendaval-durante-3",
          titulo: "Não saia nem dirija na tempestade",
          descricao:
            "Fique onde está até passar. Se estiver dirigindo, pare longe de árvores e postes e aguarde dentro do carro.",
        },
        {
          id: "vendaval-durante-4",
          titulo: "Fique longe de fios caídos",
          descricao:
            "Nunca toque em fios no chão: podem estar energizados. Sinalize a área e ligue para a distribuidora ou 193.",
        },
      ],
      depois: [
        {
          id: "vendaval-depois-1",
          titulo: "Verifique danos com segurança",
          descricao:
            "Inspecione telhado, fiação e paredes. Se houver cheiro de gás ou faíscas, saia e chame ajuda.",
        },
        {
          id: "vendaval-depois-2",
          titulo: "Fotografe tudo para o seguro",
          descricao:
            "Registre telhas, móveis e eletrônicos danificados antes de limpar. Guarde notas de reparos.",
        },
        {
          id: "vendaval-depois-3",
          titulo: "Descarte alimentos da geladeira com critério",
          descricao:
            "Após mais de 4h sem energia, descarte carnes, leite e ovos. Na dúvida, jogue fora.",
        },
        {
          id: "vendaval-depois-4",
          titulo: "Ajude a desobstruir com cuidado",
          descricao:
            "Ajude vizinhos a remover galhos, mas deixe fios e postes para as equipes oficiais.",
        },
      ],
    },
  },
  {
    risco: "geada",
    titulo: "Geadas / Frio extremo",
    fases: {
      antes: [
        {
          id: "geada-antes-1",
          titulo: "Prepare agasalhos e cobertores",
          descricao:
            "Separe roupas em camadas, meias grossas, gorros e cobertores extras, principalmente para crianças e idosos.",
          revisao: "Revisar no outono",
        },
        {
          id: "geada-antes-2",
          titulo: "Proteja canos e caixa d'água",
          descricao:
            "Isole canos expostos com espuma ou pano grosso para não estourarem. Deixe um fio de água pingando nas noites mais frias.",
        },
        {
          id: "geada-antes-3",
          titulo: "Estoque alimentos e remédios",
          descricao:
            "Tenha comida que não precise de geladeira e remédios de uso contínuo para alguns dias, caso estradas congelem.",
        },
        {
          id: "geada-antes-4",
          titulo: "Verifique aquecimento com segurança",
          descricao:
            "Limpe chaminés e revise aquecedores. Nunca use churrasqueira ou fogão a carvão dentro de casa: o monóxido de carbono mata.",
        },
      ],
      durante: [
        {
          id: "geada-durante-1",
          titulo: "Vista-se em camadas e proteja extremidades",
          descricao:
            "Várias camadas finas aquecem mais que uma grossa. Cubra mãos, pés, orelhas e pescoço ao sair.",
        },
        {
          id: "geada-durante-2",
          titulo: "Mantenha idosos e crianças aquecidos",
          descricao:
            "Verifique os mais vulneráveis com frequência. Tremor forte, confusão ou sonolência podem ser hipotermia: busque ajuda (192).",
        },
        {
          id: "geada-durante-3",
          titulo: "Evite deslocamentos no gelo",
          descricao:
            "Não dirija em pista congelada. A pé, ande devagar com calçado antiderrapante e evite pontes e sombras.",
        },
        {
          id: "geada-durante-4",
          titulo: "Cuide de animais e plantas",
          descricao:
            "Recolha pets para local abrigado com água não congelada. Cubra plantas sensíveis com lona ou jornal à noite.",
        },
      ],
      depois: [
        {
          id: "geada-depois-1",
          titulo: "Verifique canos e telhados",
          descricao:
            "Procure vazamentos após o degelo e telhas trincadas. Feche o registro se achar estouro.",
        },
        {
          id: "geada-depois-2",
          titulo: "Avalie plantações",
          descricao:
            "Aguarde alguns dias para ver o que se recupera. Pode com orientação técnica e registre perdas para seguro rural.",
        },
        {
          id: "geada-depois-3",
          titulo: "Observe a saúde nos dias seguintes",
          descricao:
            "Gripes e pneumonias aparecem depois do frio intenso. Vacine-se contra a gripe e procure atendimento aos primeiros sintomas.",
        },
        {
          id: "geada-depois-4",
          titulo: "Reponha o estoque de inverno",
          descricao:
            "Lave e guarde cobertores e roupas, reponha o que gastou e anote o que faltou para o próximo frio.",
        },
      ],
    },
  },
  {
    risco: "multiplos",
    titulo: "Múltiplos riscos",
    fases: {
      antes: [
        {
          id: "multiplos-antes-1",
          titulo: "Monte o kit universal de emergência",
          descricao:
            "Mochila com água (1L por pessoa/dia para 3 dias), alimentos não-perecíveis, lanterna + pilhas, rádio a pilha, primeiros socorros e documentos em saco plástico vedado.",
          revisao: "Revisar a cada 6 meses",
        },
        {
          id: "multiplos-antes-2",
          titulo: "Mapeie rotas para cada risco",
          descricao:
            "Para enchente e deslizamento: rota para local alto. Para vendaval: cômodo interno sem janelas. Combine um ponto de encontro com a família.",
        },
        {
          id: "multiplos-antes-3",
          titulo: "Cadastre-se nos alertas oficiais",
          descricao:
            "Envie seu CEP por SMS para 40199 e salve 193 (Bombeiros), 190 (Polícia) e 192 (SAMU) no celular.",
        },
        {
          id: "multiplos-antes-4",
          titulo: "Faça a manutenção preventiva da casa",
          descricao:
            "Telhado preso, calhas limpas, poda de árvores, canos isolados e nada de entulho em encosta. Uma casa em dia resiste a vários riscos.",
        },
      ],
      durante: [
        {
          id: "multiplos-durante-1",
          titulo: "Siga o plano do risco atual",
          descricao:
            "Abra o plano específico do alerta vigente (enchente, vendaval etc.) e execute a fase Durante dele.",
        },
        {
          id: "multiplos-durante-2",
          titulo: "Priorize a vida, nunca objetos",
          descricao:
            "Saia com o kit e documentos. Não volte para buscar bens: nada material vale o risco.",
        },
        {
          id: "multiplos-durante-3",
          titulo: "Mantenha contato com a família",
          descricao:
            "Avise para onde está indo e confirme que todos estão bem. Defina uma pessoa de fora da área como ponto de contato.",
        },
        {
          id: "multiplos-durante-4",
          titulo: "Acione ajuda oficial cedo",
          descricao:
            "Não espere piorar: ligue 193 ou para a Defesa Civil ao primeiro sinal de perigo.",
        },
      ],
      depois: [
        {
          id: "multiplos-depois-1",
          titulo: "Volte só com liberação",
          descricao:
            "Aguarde autorização da Defesa Civil. Verifique estrutura, fiação e gás antes de entrar.",
        },
        {
          id: "multiplos-depois-2",
          titulo: "Documente tudo para seguro e ajuda",
          descricao:
            "Fotografe danos, guarde notas de gastos e procure a prefeitura sobre auxílios e vistorias.",
        },
        {
          id: "multiplos-depois-3",
          titulo: "Cuide da saúde física e mental",
          descricao:
            "Observe sintomas nos dias seguintes e converse em família sobre o ocorrido. Buscar apoio psicológico é normal e saudável.",
        },
        {
          id: "multiplos-depois-4",
          titulo: "Atualize seu plano com o que aprendeu",
          descricao:
            "Anote o que funcionou e o que faltou, reponha o kit e ajuste rotas e contatos. Cada evento deixa você mais preparado.",
        },
      ],
    },
  },
];

export function buscarPlano(risco: string): PlanoRisco {
  return PLANOS.find((p) => p.risco === risco) ?? PLANOS[0];
}
