import Utils from "../utils/utils.js";
import Config from "../config.js";
import Discord from "discord.js";
const { ButtonBuilder, ActionRowBuilder, PermissionFlagsBits, InteractionType, ChannelType } = Discord;

export default (Bot) => {
  Bot.on("interactionCreate", async (interaction) => {
    if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === "ticket") {
        let Questions = Config.TICKET.QUESTIONS.map((x) => x.LABEL);

        let fields = [];

        [interaction.fields].map((z) =>
          z.fields.map((x) => {
            fields.push(x);
          })
        );

        let Value = fields.map((x) => x.value);
        let Output = Value.map((x, i) => ({
          Questions: Questions[i],
          Value: x,
        }));
        let Content = Output.map(
          (x, index) =>
            `\n\`Question ${index + 1}:\` **${x.Questions}** \n\`Reply:\` **${
              x.Value
            }**`
        ).join("\n");

        const Channel = interaction.guild.channels.cache.get("1190616928495091794");

        await interaction.deferReply({ ephemeral: true });

        if (!Channel) {
          interaction.followUp({
            content: `The channel is not specified. Please contact the server administrator.`,
            ephemeral: true,
          });
          return;
        }

        let PermissionsArray = [
          {
            id: interaction.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
          },
          {
            id: interaction.guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
        ];

        Config.TICKET.STAFF_ROLES.map((x) => {
          PermissionsArray.push({
            id: x,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
          });
        });

        Channel.send({
          content: `\n${interaction.user},<@&1190565886160015421>,<@&1190566141995798539>,<@&1190565765938688000>`,
          embeds: [Utils.embed(`\n${Content}`, interaction.guild, Bot, interaction.user)],
          components: [Utils.ticketButton()],
          permissionOverwrites: PermissionsArray,
        }).then((sentMessage) => {
          interaction.followUp({
            content:  "✔درخواست وریفای شما ثبت شد و منتظر بمانید تا ادمین ها تایید کنند!",
            ephemeral: true,
          });
        });

        // Assign a specific role
        const roleId = "1190566246937272401"; // ID of the role to assign
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
          try {
            await interaction.member.roles.add(role);
          } catch (error) {
            console.log(`یه نفر درخواست وریفای داد (${roleId}): ${error}`);
          }
        }
      }
    }

    if (!interaction.isButton()) return;

    if (interaction.customId === "ticket") {
      await interaction.showModal(Utils.modal());
    }

    if (interaction.customId === "successTicket") {
      if (
        !Config.TICKET.STAFF_ROLES.some((x) =>
          interaction.member.roles.cache.has(x)
        ) &&
        ![interaction.guild.ownerId].includes(interaction.user.id)
      ) {
        await interaction.deferReply({ ephemeral: true });
    
        interaction.followUp({
          content: `شما دسترسی ندارید!`,
          ephemeral: true,
        });
    
        return;
      } else {
        await interaction.update({
          components: [
            new ActionRowBuilder({
              components: [
                ButtonBuilder.from(
                  interaction.message.components[0].components[0]
                ).setDisabled(true),
                ButtonBuilder.from(
                  interaction.message.components[0].components[1]
                ).setDisabled(true),
                ButtonBuilder.from(
                  interaction.message.components[0].components[2]
                ),
              ],
            }),
          ],
        });
    
        interaction.followUp({
          content: `یوزر مورد نظر وریفای شد!`,
          ephemeral: true,
        });
    
        // حذف نقش قبلی و اختصاص نقش جدید
        const removeRoleId = "1190568325533671425"; // ID نقش قبلی که قرار است حذف شود رول نات وریفای
        const assignRoleId = "1190569284326404096"; // ID نقش جدید که قرار است اختصاص داده شود رول ممبر
    
        const removeRole = interaction.guild.roles.cache.get(removeRoleId);
        const assignRole = interaction.guild.roles.cache.get(assignRoleId);
        if (removeRole && assignRole) {
          try {
            await interaction.message.mentions.members.first().roles.remove(removeRole);
            await interaction.message.mentions.members.first().roles.add(assignRole);
          } catch (error) {
            console.log(`Failed to modify roles for member (${interaction.message.mentions.members.first().id}): ${error}`);
          }
        }
    
        return;
      }
    }
    if (!interaction.isButton()) return;

    if (interaction.customId === "deleteTicket") {
        if (
          !Config.TICKET.STAFF_ROLES.some((x) =>
            interaction.member.roles.cache.has(x)
          ) &&
          ![interaction.guild.ownerId].includes(interaction.user.id)
        ) {
          await interaction.deferReply({ ephemeral: true });
      
          interaction.followUp({
            content: `شما دسترسی ندارید!`,
            ephemeral: true,
          });
      
          return;
        } else {
          await interaction.update({
            components: [
              new ActionRowBuilder({
                components: [
                  ButtonBuilder.from(
                    interaction.message.components[0].components[0]
                  ).setDisabled(true),
                  ButtonBuilder.from(
                    interaction.message.components[0].components[1]
                  ).setDisabled(true),
                  ButtonBuilder.from(
                    interaction.message.components[0].components[2]
                  ),
                ],
              }),
            ],
          });
          interaction.followUp({
            content: `یوزر مورد نظر نات اکسپت شد`,
            ephemeral: true,
          });
          // حذف نقش قبلی و اختصاص نقش جدید
          const removeRoleId = "1190568325533671425"; // ID نقش قبلی که قرار است حذف شود نات وریفای
          const assignRoleId = "1190568325533671425"; // ID نقش جدید که قرار است اختصاص داده شود رول نات وریفای داعم
      
          const removeRole = interaction.guild.roles.cache.get(removeRoleId);
          const assignRole = interaction.guild.roles.cache.get(assignRoleId);
          if (removeRole && assignRole) {
            try {
              await interaction.message.mentions.members.first().roles.remove(removeRole);
              await interaction.message.mentions.members.first().roles.add(assignRole);
            } catch (error) {
              console.log(`Failed to modify roles for member (${interaction.message.mentions.members.first().id}): ${error}`);
            }
          }
      
          return;
        }
      }
    if (!interaction.isButton()) return;

    if (interaction.customId === "archiveTicket") {
      if (
        !Config.TICKET.STAFF_ROLES.some((x) =>
          interaction.member.roles.cache.has(x)
        ) &&
        ![interaction.guild.ownerId].includes(interaction.user.id)
      ) {
        await interaction.deferReply({ ephemeral: true });

        interaction.followUp({
          content: `شما دسترسی ندارید!`,
          ephemeral: true,
        });

        return;
      } else {
        await interaction.update({
          components: [
            new ActionRowBuilder({
              components: [
                ButtonBuilder.from(
                  interaction.message.components[0].components[0]
                ),
                ButtonBuilder.from(
                  interaction.message.components[0].components[1]
                ),
                ButtonBuilder.from(
                  interaction.message.components[0].components[2]
                ).setDisabled(true),
              ],
            }),
          ],
        });

        interaction.followUp({
          content: `کیرمو بخور`,
          ephemeral: true,
        });
        return;
      }
    }
  });
};