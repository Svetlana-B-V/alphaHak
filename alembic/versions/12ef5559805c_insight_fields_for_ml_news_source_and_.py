"""insight fields for ml, news source and dates

Revision ID: 12ef5559805c
Revises: 31215928b4c3
Create Date: 2026-10-15 07:59:36.912630

Таблицы insights и feedback пересоздаются целиком: в первой миграции их
внешние ключи остались без имён, и изменить их по месту нельзя. На этом
этапе таблицы пустые, поэтому данные не теряются.
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '12ef5559805c'
down_revision: Union[str, None] = '31215928b4c3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table('feedback')
    op.drop_table('insights')

    with op.batch_alter_table('news', schema=None) as batch_op:
        batch_op.add_column(sa.Column('source', sa.String(length=200), nullable=True))
        batch_op.add_column(sa.Column('published_at', sa.DateTime(), nullable=True))
        batch_op.create_unique_constraint('uq_news_source_url', ['source_url'])

    op.create_table('insights',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('news_id', sa.Integer(), nullable=False),
    sa.Column('event', sa.Text(), nullable=False),
    sa.Column('impact', sa.Text(), nullable=False),
    sa.Column('recommendation', sa.Text(), nullable=False),
    sa.Column('importance_score', sa.Integer(), nullable=False),
    sa.Column('confidence_score', sa.Double(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.ForeignKeyConstraint(['news_id'], ['news.id'], name='fk_insights_news_id_news', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='pk_insights')
    )
    op.create_index('ix_insights_news_id', 'insights', ['news_id'], unique=False)

    op.create_table('feedback',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('news_id', sa.Integer(), nullable=False),
    sa.Column('insight_id', sa.Integer(), nullable=True),
    sa.Column('is_like', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.ForeignKeyConstraint(['insight_id'], ['insights.id'], name='fk_feedback_insight_id_insights', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['news_id'], ['news.id'], name='fk_feedback_news_id_news', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='pk_feedback')
    )
    op.create_index('ix_feedback_insight_id', 'feedback', ['insight_id'], unique=False)
    op.create_index('ix_feedback_news_id', 'feedback', ['news_id'], unique=False)


def downgrade() -> None:
    op.drop_table('feedback')
    op.drop_table('insights')

    with op.batch_alter_table('news', schema=None) as batch_op:
        batch_op.drop_constraint('uq_news_source_url', type_='unique')
        batch_op.drop_column('published_at')
        batch_op.drop_column('source')

    # Таблицы в том виде, в каком их создала первая миграция
    op.create_table('insights',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('news_id', sa.Integer(), nullable=False),
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('risk_level', sa.String(length=50), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.ForeignKeyConstraint(['news_id'], ['news.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('feedback',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('news_id', sa.Integer(), nullable=False),
    sa.Column('insight_id', sa.Integer(), nullable=True),
    sa.Column('is_like', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.ForeignKeyConstraint(['insight_id'], ['insights.id'], ),
    sa.ForeignKeyConstraint(['news_id'], ['news.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
